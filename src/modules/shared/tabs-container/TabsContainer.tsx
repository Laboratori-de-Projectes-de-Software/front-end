import Tab from "../tab/Tab";
import "./TabsContainer.scss";

interface TabsContainerProps {
    children: React.ReactElement<typeof Tab>[];
}

const TabsContainer: React.FC<TabsContainerProps> = ({ children }) => {
    return (
        <div className="tabs-container">
            {children}
        </div>
    )
}

export default TabsContainer;