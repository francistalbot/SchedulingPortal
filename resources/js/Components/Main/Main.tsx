import Scheduler from "../Scheduler";
import { Browser } from '@syncfusion/ej2-base';
import { SidebarComponent } from '@syncfusion/ej2-react-navigations';
import './Main.css';
export const Main = () => {
    const isDevice: boolean = Browser.isDevice;
    return (
        <div>
            <SidebarComponent id='portalSideBar'  enableGestures={false} showBackdrop={isDevice} closeOnDocumentClick={isDevice}>
                <div className='dock'>
                    <div className='info align-center'>
                        <div className='image'></div>
                        <div className='content nameContent'>
                            <p className='name' style={{ marginTop: '16px' }}>Jane Doe</p>
                            <p className='user-type'>Admin</p>
                            </div>
                    </div>
                    <div className='sidebar-item dashboard' id="dashboard">
                        <span className="dashboard-image"><span className="icon-dashboard item-image"></span></span>
                        <span className="text" title="dashboard">Tableau de bord</span>
                    </div>
                    <div className="sidebar-item calendar" id="calendar" >
                        <span className="scheduler-image"><span className="icon-schedule item-image"></span></span>
                        <span className="text" title="calendar">Calendrier</span>
                    </div>
                    <div className="sidebar-item volunteers" id="volunteers" >
                            <span className="volunteers-image"><span className="icon-volunteers item-image"></span></span>
                            <span className="text" title="volunteers">Bénévoles</span>
                    </div>
                    <div className="sidebar-item preference" id="preference" >
                        <span className="preference-image"><span className="icon-preference item-image"></span></span>
                        <span className="text" title="preference">Préférences</span>
                    </div>
                    <div className="sidebar-item about" id="about" >
                        <span className="about-image"><span className="icon-about item-image"></span></span>
                        <span className="text" title="about">À propos</span>
                    </div>
                 </div>
            </SidebarComponent>
            <main className="mt-6">
                <div className="portal-header">
                    <div className="side-bar-opener">
                        <span className="open-icon e-icons"></span>
                    </div>
                    <div className="name-container">
                        <span className="clinic-image icon-logo"></span>
                        <h1 className='clinic-name'> Portail La Remise</h1>
                    </div>
                    <div className='logout-container'>
                        <div className="logout-icon-container"><span className="icon-logout logout-image"></span></div>
                        <span className='logout-name'>Logout</span>
                    </div>
                </div>
                <Scheduler />
            </main>
        </div>
    );
};
