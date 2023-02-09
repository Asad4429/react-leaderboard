/**
 * A class representing a service that processes the data for match schedule
 * and generates leaderboard.
 * 
 * NOTE: MAKE SURE TO IMPLEMENT ALL EXISITNG METHODS BELOW AND
 *       PLEASE DO NOT RENAME, MOVE OR DELETE THIS FILE.  
 */

import { ENDPOINTS } from '../constant'
import { authedFetch } from '../utils';

class LeagueService {
    constructor() {
        this.matches = [];
    }
    /**
     * Sets the match schedule.
     * Match schedule will be given in the following form:
     * [
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      },
     *      {
     *          matchDate: [TIMESTAMP],
     *          stadium: [STRING],
     *          homeTeam: [STRING],
     *          awayTeam: [STRING],
     *          matchPlayed: [BOOLEAN],
     *          homeTeamScore: [INTEGER],
     *          awayTeamScore: [INTEGER]
     *      }    
     * ]
     * 
     * @param {Array} matches List of matches.
     */
    setMatches(matches) {
        if (Array.isArray(matches)) this.matches = [...matches];
    }

    /**
     * Returns the full list of matches.
     * 
     * @returns {Array} List of matches.
     */
    getMatches() {
        return this.matches;
    }

    /**
     * Returns the leaderboard in a form of a list of JSON objecs.
     * 
     * [     
     *      {
     *          teamName: [STRING]',
     *          matchesPlayed: [INTEGER],
     *          goalsFor: [INTEGER],
     *          goalsAgainst: [INTEGER],
     *          points: [INTEGER]     
     *      },      
     * ]       
     * 
     * @returns {Array} List of teams representing the leaderboard.
     */
    getLeaderboard() {
        const leaderboard = [];
        const leaderboardTeams = this.calculateTeamPoints([...this.matches]);
        // Preparing list of teams
        for (const team in leaderboardTeams) {
            leaderboard.push({
                teamName: team,
                ...leaderboardTeams[team]
            });
        }

        // Sort teams and resolve tiebreakers
        leaderboard.sort((a, b) => {
            // Firstly try points
            if(a.points < b.points) return 1;
            if(a.points > b.points) return -1;

            // Try mini leaderboard points
            const matches = this.matches.filter(match => match.matchPlayed && ((match.homeTeam === a.teamName && match.awayTeam === b.teamName) || (match.homeTeam === b.teamName && match.awayTeam === a.teamName)));
            if(matches){
                const miniLeaderBoardTeams = this.calculateTeamPoints([...matches]);
                if(a.teamName in miniLeaderBoardTeams && b.teamName in miniLeaderBoardTeams){
                    if(miniLeaderBoardTeams[a.teamName].points < miniLeaderBoardTeams[b.teamName].points) return 1;
                    if(miniLeaderBoardTeams[a.teamName].points > miniLeaderBoardTeams[b.teamName].points) return -1;
                }
            }
            
            // Try goal difference
            const aGoalDiff = a.goalsFor-a.goalsAgainst;
            const bGoalDiff = b.goalsFor-b.goalsAgainst;
            if(aGoalDiff < bGoalDiff) return 1;
            if(aGoalDiff > bGoalDiff) return -1;

            // Try scored goals
            if(a.goalsFor < b.goalsFor) return 1;
            if(a.goalsFor > b.goalsFor) return -1;

            // Try alphabetic ascending order by name
            if(a.teamName < b.teamName) return 1;
            if(a.teamName > b.teamName) return -1;

            return 0;
        });
        return leaderboard;
    }

    calculateTeamPoints(matches) {
        const leaderboardTeams = {};
        if (matches && matches.length > 0) {
            for (const match of matches) {
                if (match.matchPlayed) {
                    if (match.homeTeam in leaderboardTeams) {
                        const team = leaderboardTeams[match.homeTeam];
                        team.matchesPlayed = team.matchesPlayed + 1;
                        team.goalsFor = team.goalsFor + match.homeTeamScore;
                        team.goalsAgainst = team.goalsAgainst + match.awayTeamScore;
                        team.points = match.homeTeamScore > match.awayTeamScore ? team.points + 3 : match.homeTeamScore === match.awayTeamScore ? team.points + 1 : team.points;
                    } else {
                        // Adding team for the 1st time
                        leaderboardTeams[match.homeTeam] = {
                            matchesPlayed: 1,
                            goalsFor: match.homeTeamScore,
                            goalsAgainst: match.awayTeamScore,
                            points: match.homeTeamScore > match.awayTeamScore ? 3 : match.homeTeamScore === match.awayTeamScore ? 1 : 0
                        }
                    }
                    if (match.awayTeam in leaderboardTeams) {
                        const team = leaderboardTeams[match.awayTeam];
                        team.matchesPlayed = team.matchesPlayed + 1;
                        team.goalsFor = team.goalsFor + match.awayTeamScore;
                        team.goalsAgainst = team.goalsAgainst + match.homeTeamScore;
                        team.points = match.awayTeamScore > match.homeTeamScore ? team.points + 3 : match.homeTeamScore === match.awayTeamScore ? team.points + 1 : team.points;
                    } else {
                        // Adding team for the 1st time
                        leaderboardTeams[match.awayTeam] = {
                            matchesPlayed: 1,
                            goalsFor: match.awayTeamScore,
                            goalsAgainst: match.homeTeamScore,
                            points: match.awayTeamScore > match.homeTeamScore ? 3 : match.homeTeamScore === match.awayTeamScore ? 1 : 0
                        }
                    }
                }
            }
        }
        return leaderboardTeams;
    }

    /**
     * Asynchronic function to fetch the data from the server.
     */
    async fetchData() {
        // Fetching data via API call and set
        const resp = await authedFetch(ENDPOINTS.GET_ALL_MATCHES);
        if (resp.ok && resp.data && resp.data.success) {
            this.setMatches(resp.data.matches)
            return resp;
        }
        throw Error('Invalid API response');
    }
}

export default LeagueService;