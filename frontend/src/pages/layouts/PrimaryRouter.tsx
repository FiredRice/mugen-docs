import { Route, Switch, useHistory } from 'react-router-dom';
import LodingCom from './LodingCom';
import { useAsyncEffect } from 'ahooks';
import docs from 'src/service/docs';
import optionService from 'src/service/optionService';

import Home from '../home';
import { LogError } from 'wailsjs/runtime/runtime';

const PrimaryRoutes = () => {
    const history = useHistory();

    useAsyncEffect(async () => {
        try {
            await Promise.all([
                docs.init(),
                optionService.init()
            ]);
        } catch (error) {
            console.log(error);
            LogError(JSON.stringify(error));
        }
        history.replace('/home');
    }, []);

    return (
        <Switch>
            <Route path='/' exact component={LodingCom} />
            <Route path='/home' component={Home} />
        </Switch>
    );
};

export default PrimaryRoutes;
