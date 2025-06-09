import {  ScheduleComponent,  Day,  Week,  WorkWeek,  Month,  Agenda,  Inject,
  ViewsDirective,  ViewDirective,  EventSettingsModel } from '@syncfusion/ej2-react-schedule';
import { Internationalization } from '@syncfusion/ej2-base';
  
export default function Scheduler() {

interface EventProps {
  Id: number;
  Subject: string;
  Roles: string
  StartTime: Date;
  EndTime: Date;
  Source: string;
  IsAllDay: boolean;
}

  const instance: Internationalization = new Internationalization();
  const getTimeString = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'hm' });
  }

  const localData : EventProps[]  = [
];

  //Template personnalisée pour l'affichage des événements
  const eventTemplate = (props : EventProps) => {
    return (
    <div className="e-appointment-details" >
      <div className="e-subject">{props.Subject}</div>
      <div className="e-time" > {getTimeString(props.StartTime)} - {getTimeString(props.EndTime)} </div>
      <div className="e-location" >{props.Source}</div>
    </div>);
  }  
  const eventSettings: EventSettingsModel  = {  dataSource: localData,  template : eventTemplate};// } 

  return (
    <ScheduleComponent
      eventSettings={eventSettings}
      style={{ marginTop: '100px'   }}
    >
        <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="WorkWeek" />
            <ViewDirective option="Month"/>
        </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}
