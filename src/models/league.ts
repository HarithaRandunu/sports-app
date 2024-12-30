// export type League = {
//     idLeague: string;
//     strLeague: string;
//     strSport: string;
//     strLeagueAlternate: string;
//     intDivision: string;
//     idCup: string;
//     strCurrentSeason: string;
//     intFormedYear: string;
//     dateFirstEvent: string;
//     strGender: string;
//     strCountry: string;
//     strWebsite: string;
//     strFacebook: string;
//     strInstagram: string;
//     strTwitter: string;
//     strYoutube: string;
//     strRSS: string;
//     strDescriptionEN: string;
//     strTvRights: string;
//     strFanart1: string;
//     strFanart2: string;
//     strFanart3: string;
//     strFanart4: string;
//     strBanner: string;
//     strBadge: string;
//     strLogo: string;
//     strPoster: string;
//     strTrophy: string;
//     strNaming: string;
//     strComplete: string;
//     strLocked: string;
// }

export type LeagueCartDetails = {
    idLeague: string;
    strLeague: string;
    strSport: string;
    strLeagueAlternate: string;
}

export type LeaguesAll = {
    leagues: LeagueCartDetails[];
}
