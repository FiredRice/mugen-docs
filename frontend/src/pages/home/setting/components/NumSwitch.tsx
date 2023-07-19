import React from 'react';
import { Switch, SwitchProps } from 'antd';

interface INumSwitchProps extends Omit<SwitchProps, 'onChange'> {
    value?: number;
    open?: number;
    close?: number;
    onChange?: (value: number) => void;
}

const NumSwitch: React.FC<INumSwitchProps> = (props) => {

    const { value, open = 1, close = 0, onChange, ...otherProps } = props;

    const _onChange = (checked) => {
        if (checked) {
            onChange?.(open);
        } else {
            onChange?.(close);
        }
    };

    return (
        <Switch
            checked={value === open}
            onChange={_onChange}
            checkedChildren='开'
            unCheckedChildren='关'
            {...otherProps}
        />
    );
};

export default NumSwitch;