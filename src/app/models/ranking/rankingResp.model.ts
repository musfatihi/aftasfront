import {RankingCompositeKey} from "./rankingCompositeKey.model";

export interface RankingResp {
  rankingCompositeKey:RankingCompositeKey;
  rank?:number;
  score?:number;
}
