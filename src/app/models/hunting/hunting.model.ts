import {CompetitionCode} from "../competition/competitionCode";
import {MemberNum} from "../member/memberNum.model";
import {FishName} from "../fish/fishName.model";

export interface Hunting {
  competition:CompetitionCode;
  member:MemberNum;
  fish:FishName;
}
