"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accessibility = exports.ArchitectApprovalLabels = exports.ArchitectApproval = exports.CommunityVettedHelper = exports.CommunityVettedLabels = exports.CommunityVetted = exports.ProjectStageHelper = exports.ProjectStageLabels = exports.ProjectStage = exports.ProjectTypeHelper = exports.ProjectTypeLabels = exports.ProjectType = exports.ProjectStaffRankHelper = exports.ProjectStaffRank = void 0;
exports.createEnumHelper = createEnumHelper;
var ProjectStaffRank;
(function (ProjectStaffRank) {
    ProjectStaffRank["LEAD"] = "lead";
    ProjectStaffRank["STAFF"] = "staff";
})(ProjectStaffRank || (exports.ProjectStaffRank = ProjectStaffRank = {}));
class ProjectStaffRankHelper {
    static pretty(rank) {
        switch (rank) {
            case ProjectStaffRank.LEAD: return "Lead";
            case ProjectStaffRank.STAFF: return "Staff";
        }
    }
    static values() {
        return [
            ProjectStaffRank.LEAD,
            ProjectStaffRank.STAFF,
        ];
    }
}
exports.ProjectStaffRankHelper = ProjectStaffRankHelper;
var ProjectType;
(function (ProjectType) {
    ProjectType["MMO"] = "mmo";
    ProjectType["SMP"] = "smp";
    ProjectType["MAP"] = "map";
    ProjectType["RPG"] = "rpg";
    ProjectType["OTHER"] = "other";
})(ProjectType || (exports.ProjectType = ProjectType = {}));
exports.ProjectTypeLabels = {
    [ProjectType.MMO]: "MMO",
    [ProjectType.SMP]: "SMP",
    [ProjectType.MAP]: "Map",
    [ProjectType.RPG]: "RPG",
    [ProjectType.OTHER]: "Other"
};
exports.ProjectTypeHelper = createEnumHelper(ProjectType, exports.ProjectTypeLabels);
var ProjectStage;
(function (ProjectStage) {
    ProjectStage["RELEASED"] = "released";
    ProjectStage["IN_DEVELOPMENT"] = "in_development";
    ProjectStage["ALPHA"] = "alpha";
    ProjectStage["BETA"] = "beta";
    ProjectStage["CLOSED"] = "closed";
})(ProjectStage || (exports.ProjectStage = ProjectStage = {}));
exports.ProjectStageLabels = {
    [ProjectStage.RELEASED]: "Released",
    [ProjectStage.IN_DEVELOPMENT]: "In Development",
    [ProjectStage.ALPHA]: "Alpha",
    [ProjectStage.BETA]: "Beta",
    [ProjectStage.CLOSED]: "Closed"
};
exports.ProjectStageHelper = createEnumHelper(ProjectStage, exports.ProjectStageLabels);
var CommunityVetted;
(function (CommunityVetted) {
    CommunityVetted["ACCEPTED"] = "accepted";
    CommunityVetted["REJECTED"] = "rejected";
    CommunityVetted["UNVETTED"] = "unvetted";
    CommunityVetted["SKIPPED"] = "skipped";
})(CommunityVetted || (exports.CommunityVetted = CommunityVetted = {}));
exports.CommunityVettedLabels = {
    [CommunityVetted.ACCEPTED]: "Passed",
    [CommunityVetted.REJECTED]: "Rejected",
    [CommunityVetted.UNVETTED]: "Unvetted",
    [CommunityVetted.SKIPPED]: "Skipped",
};
exports.CommunityVettedHelper = createEnumHelper(CommunityVetted, exports.CommunityVettedLabels);
var ArchitectApproval;
(function (ArchitectApproval) {
    ArchitectApproval["APPROVED"] = "approved";
    ArchitectApproval["UNAPPROVED"] = "unapproved";
    ArchitectApproval["DISQUALIFIED"] = "disqualified";
    ArchitectApproval["HIDDEN"] = "hidden";
})(ArchitectApproval || (exports.ArchitectApproval = ArchitectApproval = {}));
exports.ArchitectApprovalLabels = {
    [ArchitectApproval.APPROVED]: "Approved",
    [ArchitectApproval.UNAPPROVED]: "Unapproved",
    [ArchitectApproval.DISQUALIFIED]: "Disqualified",
    [ArchitectApproval.HIDDEN]: "Hidden",
};
var Accessibility;
(function (Accessibility) {
    Accessibility["PUBLIC"] = "public";
    Accessibility["PAID"] = "paid";
    Accessibility["EXCLUSIVE"] = "exclusive";
    Accessibility["CLOSED"] = "closed";
})(Accessibility || (exports.Accessibility = Accessibility = {}));
function createEnumHelper(enumObj, labels) {
    return {
        values: () => Object.values(enumObj),
        pretty: (value) => labels[value] ?? value,
    };
}
//# sourceMappingURL=types.js.map