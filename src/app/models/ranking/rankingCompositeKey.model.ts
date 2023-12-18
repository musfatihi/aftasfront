import {CompetitionCode} from "../competition/competitionCode";
import {Member} from "../member/member.model";

export interface RankingCompositeKey {
  competition:CompetitionCode;
  member:Member;
}
