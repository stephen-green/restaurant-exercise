import './Collapsible.css';

import { useState } from 'react';

export function Collapsible({collapsed = true, children}) {
    const [isCollapsed, setCollapsed] = useState(collapsed);
    
    function handleClick() {
        setCollapsed(!isCollapsed);
    }
    
    return (
        <div onClick={handleClick} className={isCollapsed ? 'collapsed' : 'expanded'}>{children}</div>
    );
}
