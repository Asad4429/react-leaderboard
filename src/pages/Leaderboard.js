import React from 'react';
import { COUNTRY_FLAG_BASE_URL } from './../constant';
import style from './styles/Leaderboard.module.css';


const Leaderboard = ({ leaderboard }) => {
  return (
    <main className={style.container}>
      <h1 className={style.heading}>League Standings</h1>
      {leaderboard && leaderboard.length > 0 ?
        <table className={style.dataContainer} cellSpacing={0} cellPadding={8}>
          <thead>
            <tr className={style.dataHeader}>
              <th className={`${style.dataHeading} ${style.leftAlign} ${style.teamNameCol}`}>Team Name</th>
              <th className={style.dataHeading}>MP</th>
              <th className={`${style.dataHeading} ${style.goalForCol}`}>GF</th>
              <th className={`${style.dataHeading} ${style.goalAgainstCol}`}>GA</th>
              <th className={`${style.dataHeading} ${style.goalDiffCol}`}>GD</th>
              <th className={style.dataHeading}>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(team => {
              return <tr key={team.teamName} className={style.dataItem}>
                <td className={style.dataItemTextBold}><span className={style.teamInfo}><img className={style.flag} src={`${COUNTRY_FLAG_BASE_URL}${team.teamName}`} alt={team.teamName} />{team.teamName}</span></td>
                <td className={style.dataItemText}>{team.matchesPlayed}</td>
                <td className={`${style.dataItemText} ${style.goalForCol}`}>{team.goalsFor}</td>
                <td className={`${style.dataItemText} ${style.goalAgainstCol}`}>{team.goalsAgainst}</td>
                <td className={`${style.dataItemText} ${style.goalDiffCol}`}>{team.goalsFor - team.goalsAgainst}</td>
                <td className={`${style.dataItemTextBold} ${style.highlight}`}>{team.points}</td>
              </tr>
            })}
          </tbody>
        </table>
        :
        <p>No Team Found</p>
      }
    </main>
  );
}

export default Leaderboard
