import { useMemo } from 'react';
import { Card, Divider, Menu } from 'antd';
import { useRefContext, useWatch } from '../../hooks/context';
import docs from 'src/service/docs';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { otherMenus } from './hooks';
import './style/index.less';

const LeftSide = () => {

    const refInstance = useRefContext();
    const current = useWatch('current');

    const history = useHistory();
    const match = useRouteMatch();

    const list = useMemo(() => {
        const menus = docs.getMenus();
        const list: ItemType<MenuItemType>[] = menus.map((m, i) => ({
            key: i,
            label: m
        }));
        return list;
    }, []);

    const onMenuClick = ({ key }) => {
        if (key === current) return;
        if (/^\d*$/.test(key)) {
            history.replace(`${match.path}`);
        } else {
            history.replace(`${match.path}/${key}`);
        }
        refInstance.setValues({ current: key });
    };

    return (
        <Card className='left-side-card'>
            <Menu
                className='docs-menus'
                selectedKeys={[current]}
                onClick={onMenuClick}
                items={list}
            />
            <Divider className='m-divider' />
            <Menu
                className='other-menus'
                selectedKeys={[current]}
                onClick={onMenuClick}
                items={otherMenus}
            />
        </Card>
    );
};

export default LeftSide;