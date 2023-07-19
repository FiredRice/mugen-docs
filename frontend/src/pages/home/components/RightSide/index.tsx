import { Route, Switch, useRouteMatch } from 'react-router-dom';
import RightMarkdown from '../RightMarkdown';
import Setting from '../../setting';

const RightSide = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}`} exact component={RightMarkdown} />
            <Route path={`${match.path}/setting`} exact component={Setting} />
        </Switch>
    );
};

export default RightSide;