package core

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"mugen-docs/src/log"
	"mugen-docs/src/store"
)

// App struct
type App struct {
	ctx   context.Context
	store *store.Store
}

// NewApp creates a new App application struct
func New() *App {
	store, err := store.NewStore()
	if err != nil {
		println(err.Error())
	}
	return &App{store: store}
}

func (a *App) Context() *context.Context {
	return &a.ctx
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.loadConfig()
}

// 加载配置
func (a *App) loadConfig() {
	pos, err := a.store.GetPos()
	if err != nil {
		runtime.LogInfo(a.ctx, err.Error())
		return
	}
	runtime.WindowSetPosition(a.ctx, pos.X, pos.Y)
	size, _ := a.store.GetSize()
	runtime.WindowSetSize(a.ctx, size.Width, size.Height)
}

// 实例化日志
func (a *App) CreateLog() logger.Logger {
	if a.store.GetLog() {
		logger := log.NewLog()
		logger.Init()
		return logger
	}
	return logger.NewDefaultLogger()
}

func (a *App) BeforeClose(ctx context.Context) bool {
	x, y := runtime.WindowGetPosition(ctx)
	a.store.SetPos(x, y)
	width, height := runtime.WindowGetSize(ctx)
	a.store.SetSize(width, height)
	err := a.store.Save()
	if err != nil {
		runtime.LogInfo(ctx, err.Error())
	}
	return false
}
