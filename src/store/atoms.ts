import { Party } from "@prisma/client";
import { atom } from "recoil";
import { SpecLimit } from "../components/custom/masters/spec-limit/columns";
import { Test } from "../components/custom/masters/tests-master/columns";
import { Specification } from "../components/custom/masters/specifications/columns";
import { Sample as MasterSample } from "../components/custom/masters/samples/columns";
import { Branch } from "../components/custom/orders/new-package-entry/new-package-entry-tab";
import { GetAllSamplesForProcessingType } from "../components/custom/orders/process-sample/actions";
import { GetAllSamplesForTestingType } from "../components/custom/orders/update-test-result/actions";
import { GetAllSamplesForReportType } from "../components/custom/orders/get-report/actions";
import { PartyWithBranchesType } from "../components/custom/parties/actions";

export const masterSamplesState = atom<MasterSample[]>({
  key: "masterSamplesState",
  default: [],
});

export const masterSpecificationsState = atom<Specification[]>({
  key: "masterSpecificationsState",
  default: [],
});

export const masterTestsState = atom<Test[]>({
  key: "masterTestsState",
  default: [],
});

export const masterSpecLimitsState = atom<SpecLimit[]>({
  key: "masterSpecLimitsState",
  default: [],
});

export const partiesState = atom<Party[]>({
  key: "partiesState",
  default: [],
});

export const partiesWithBranchesState = atom<PartyWithBranchesType[]>({
  key: "partiesWithBranchesState",
  default: [],
});

export const branchesState = atom<Branch[]>({
  key: "branchesState",
  default: [],
});

export const samplesForProcessingState = atom<GetAllSamplesForProcessingType[]>(
  {
    key: "samplesForProcessingState",
    default: [],
  }
);

export const samplesForTestingState = atom<GetAllSamplesForTestingType[]>({
  key: "samplesForTestingState",
  default: [],
});

export const samplesForReportState = atom<GetAllSamplesForReportType[]>({
  key: "samplesForReportState",
  default: [],
});
