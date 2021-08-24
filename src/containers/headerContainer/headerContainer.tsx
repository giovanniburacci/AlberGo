import React from 'react';
import {MenuUnfoldOutlined, MenuFoldOutlined} from '@ant-design/icons';
import './headerContainer.scss'
const componentClassName = 'HeaderContainer'

interface HeaderContainerProps {
    setCollapsed: (value:boolean) => void,
    isCollapsed: boolean
}
export const HeaderContainer = (props:HeaderContainerProps) => {
    const {setCollapsed, isCollapsed } = props;
    return (
        <div className={`${componentClassName}`}>
            {
                isCollapsed ? (
                    <MenuUnfoldOutlined style={{fontSize: '32px'}} onClick={() => {setCollapsed(false)}}/>
                ) : (
                    <MenuFoldOutlined style={{fontSize: '32px'}} onClick={() => {setCollapsed(true)}}/>
                )
            }
        </div>
    )
}

export default HeaderContainer;
