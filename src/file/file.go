package file

import (
	"context"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io/fs"
	"net/http"
	"os"
	"regexp"
	"strings"
)

type File struct {
	ctx *context.Context
}

func New(context *context.Context) *File {
	return &File{context}
}

func (f *File) ErrorLog(err error) {
	runtime.LogError(*f.ctx, err.Error())
}

func (f *File) WriteFile(path string, content string) error {
	return os.WriteFile(path, []byte(content), fs.ModePerm)
}

func (f *File) ReadFile(path string) (string, error) {
	content, err := os.ReadFile(path)
	if err != nil {
		f.ErrorLog(err)
		return "", err
	}
	return string(content), nil
}

type FileLoader struct {
	http.Handler
}

func NewFileLoader() *FileLoader {
	return &FileLoader{}
}

var fileServiceReg, _ = regexp.Compile("^wails/")

func (h *FileLoader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
	var err error
	requestedFilename := strings.TrimPrefix(req.URL.Path, "/")
	requestedFilename = fileServiceReg.ReplaceAllString(requestedFilename, "")
	fileData, err := os.ReadFile(requestedFilename)
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		res.Write([]byte(fmt.Sprintf("Could not load file %s", requestedFilename)))
	}
	res.Write(fileData)
}
