const Tab = ({ active, children }: any) => {
    return (
        <section className="tab-content" style={{ display: active ? "block" : "none" }}>
            {children}
        </section>
    );
}

export default Tab;