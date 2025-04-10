import { useState } from "react"
import "./UserInfo.scss"
import { useAuth } from "../../auth/AuthProvider"
import TabsContainer from "@modules/shared/tabs-container/TabsContainer"
import Tab from "@modules/shared/tab/Tab"
import Summary from "@modules/user-info/summary/Summary"
import ExtraInfo from "@modules/user-info/extra-info/ExtraInfo"
import MyBots from "@modules/user-info/my-bots/MyBots"
import { appApi } from "../../features/shared/index"
import Configuration from "@modules/user-info/configuration/Configuration"

const UserInfo = () => {
    const [activeTab, setActiveTab] = useState("informacion")
    const auth = useAuth()
    const { data: BotData } = appApi.useGetBotQuery(auth!.getUser()?.userId)

    return (
        <article className="profile-container">
            <div className="profile-content">
                <Summary user={auth!.getUser()} />

                <TabsContainer>
                    <div className="tabs-list">
                        <button
                            className={`tab-button ${activeTab === "informacion" ? "active" : ""}`}
                            onClick={() => setActiveTab("informacion")}
                        >
                            Información
                        </button>
                        <button
                            className={`tab-button ${activeTab === "bots" ? "active" : ""}`}
                            onClick={() => setActiveTab("bots")}
                        >
                            Mis Bots
                        </button>
                        <button
                            className={`tab-button ${activeTab === "ajustes" ? "active" : ""}`}
                            onClick={() => setActiveTab("ajustes")}
                        >
                            Ajustes
                        </button>
                    </div>

                    <Tab active={activeTab === "informacion"}>
                        <ExtraInfo user={auth!.getUser()}/>
                    </Tab>

                    <Tab active={activeTab === "bots"}>
                        <MyBots bots={BotData ?? []} />
                    </Tab>

                    <Tab active={activeTab === "ajustes"}>
                        <Configuration />   
                    </Tab>
                </TabsContainer>
            </div>
        </article>
    )
}

export default UserInfo
