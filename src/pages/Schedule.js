import React from 'react';
import { COUNTRY_FLAG_BASE_URL } from './../constant';
import style from './styles/Schedule.module.css';


const Schedule = ({ matches }) => {
  return (
    <main className={style.container}>
      <h1 className={style.heading}>League Schedule</h1>
      {matches && matches.length > 0 ?
        <table className={style.dataContainer} cellSpacing={0} cellPadding={8}>
          <thead>
            <tr className={style.dataHeader}>
              <th className={`${style.dataHeading} ${style.dateTimeCol}`}>Date/Time</th>
              <th className={`${style.dataHeading} ${style.stadiumCol}`}>Stadium</th>
              <th className={`${style.dataHeading} ${style.rightAlign}`}>Home Team</th>
              <th className={style.dataHeading}></th>
              <th className={`${style.dataHeading} ${style.leftAlign}`}>Away Team</th>
            </tr>
          </thead>
          <tbody>
            {matches.map(match => {
              const date = new Date(match.matchDate);
              return <tr key={match.homeTeam + match.awayTeam} className={style.dataItem}>
                <td className={`${style.dataItemText} ${style.dateTimeCol}`}><span className={style.dtItemContainer}><label>{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</label><label>{date.getHours()}:{date.getMinutes()}</label></span></td>
                <td className={`${style.dataItemText} ${style.stadiumCol}`}>{match.stadium}</td>
                <td className={`${style.dataItemTextBold} ${style.homeTeamItemCol}`}><span className={style.teamInfo} style={{ justifyContent: 'flex-end' }}>{match.homeTeam}<img className={style.flag} src={`${COUNTRY_FLAG_BASE_URL}${match.homeTeam}`} alt={match.homeTeam} /></span></td>
                <td className={`${style.dataItemTextBold} ${style.scoreCol}`}>{match.matchPlayed ? `${match.homeTeamScore} : ${match.awayTeamScore}` : '- : -'}</td>
                <td className={`${style.dataItemTextBold} ${style.awayTeamItemCol}`}><span className={style.teamInfo}><img className={style.flag} src={`${COUNTRY_FLAG_BASE_URL}${match.awayTeam}`} alt={match.awayTeam} />{match.awayTeam}</span></td>
              </tr>
            })}
          </tbody>
        </table>
        :
        <p>No Match Found</p>
      }

    </main>
  );
}

export default Schedule
