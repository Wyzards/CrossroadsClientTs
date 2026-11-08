"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTierHelper = exports.ProjectTierLabels = exports.ProjectTier = exports.AccessibilityHelper = exports.AccessibilityLabels = exports.Accessibility = exports.ArchitectApprovalHelper = exports.ArchitectApprovalLabels = exports.ArchitectApproval = exports.CommunityVettedHelper = exports.CommunityVettedLabels = exports.CommunityVetted = exports.ProjectStageHelper = exports.ProjectStageLabels = exports.ProjectStage = exports.DiscordKindHelper = exports.DiscordKindLabels = exports.DiscordKind = exports.JoinMethodHelper = exports.JoinMethodLabels = exports.JoinMethod = exports.ProjectFormatHelper = exports.ProjectFormatLabels = exports.ProjectFormat = exports.ProjectStaffRankHelper = exports.ProjectStaffRank = void 0;
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
/** What kind of thing a project is. Maps get no channel and list in the maps forum. (Replaced `type`; gameplay is now tags.) */
var ProjectFormat;
(function (ProjectFormat) {
    ProjectFormat["SERVER"] = "server";
    ProjectFormat["MAP"] = "map";
})(ProjectFormat || (exports.ProjectFormat = ProjectFormat = {}));
exports.ProjectFormatLabels = {
    [ProjectFormat.SERVER]: "Server",
    [ProjectFormat.MAP]: "Map",
};
exports.ProjectFormatHelper = createEnumHelper(ProjectFormat, exports.ProjectFormatLabels);
/** How players get in: the project's own address (ip), or a network hub (ip) plus join_instructions. */
var JoinMethod;
(function (JoinMethod) {
    JoinMethod["DIRECT"] = "direct";
    JoinMethod["NETWORK"] = "network";
})(JoinMethod || (exports.JoinMethod = JoinMethod = {}));
exports.JoinMethodLabels = {
    [JoinMethod.DIRECT]: "Direct",
    [JoinMethod.NETWORK]: "Through a network",
};
exports.JoinMethodHelper = createEnumHelper(JoinMethod, exports.JoinMethodLabels);
/** Where the project's community lives on Discord. */
var DiscordKind;
(function (DiscordKind) {
    DiscordKind["OWN"] = "own";
    DiscordKind["NETWORK"] = "network";
    DiscordKind["NONE"] = "none";
})(DiscordKind || (exports.DiscordKind = DiscordKind = {}));
exports.DiscordKindLabels = {
    [DiscordKind.OWN]: "Its own server",
    [DiscordKind.NETWORK]: "A network's shared server",
    [DiscordKind.NONE]: "No Discord",
};
exports.DiscordKindHelper = createEnumHelper(DiscordKind, exports.DiscordKindLabels);
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
    CommunityVetted["PROJECT_HUNT_QUEUE"] = "project_hunt_queue";
    CommunityVetted["VETTING_QUEUE"] = "vetting_queue";
    CommunityVetted["CURRENTLY_VETTING"] = "currently_vetting";
})(CommunityVetted || (exports.CommunityVetted = CommunityVetted = {}));
exports.CommunityVettedLabels = {
    [CommunityVetted.ACCEPTED]: "Passed",
    [CommunityVetted.REJECTED]: "Rejected",
    [CommunityVetted.UNVETTED]: "Unvetted",
    [CommunityVetted.SKIPPED]: "Skipped",
    [CommunityVetted.PROJECT_HUNT_QUEUE]: "Project Hunt Queue",
    [CommunityVetted.VETTING_QUEUE]: "Community Vetting Queue",
    [CommunityVetted.CURRENTLY_VETTING]: "Currently Vetting"
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
exports.ArchitectApprovalHelper = createEnumHelper(ArchitectApproval, exports.ArchitectApprovalLabels);
var Accessibility;
(function (Accessibility) {
    Accessibility["PUBLIC"] = "public";
    Accessibility["PAID"] = "paid";
    Accessibility["EXCLUSIVE"] = "exclusive";
    Accessibility["CLOSED"] = "closed";
})(Accessibility || (exports.Accessibility = Accessibility = {}));
exports.AccessibilityLabels = {
    [Accessibility.PUBLIC]: "Public",
    [Accessibility.PAID]: "Paid",
    [Accessibility.EXCLUSIVE]: "Exclusive",
    [Accessibility.CLOSED]: "Closed",
};
exports.AccessibilityHelper = createEnumHelper(Accessibility, exports.AccessibilityLabels);
/** Featured level of a listed project; shown as an emoji in its channel name (see the bot's ProjectMessageBuilder). */
var ProjectTier;
(function (ProjectTier) {
    ProjectTier["NORMAL"] = "normal";
    ProjectTier["STAR"] = "star";
    ProjectTier["FLAME"] = "flame";
})(ProjectTier || (exports.ProjectTier = ProjectTier = {}));
exports.ProjectTierLabels = {
    [ProjectTier.NORMAL]: "Normal",
    [ProjectTier.STAR]: "Star",
    [ProjectTier.FLAME]: "Flame",
};
exports.ProjectTierHelper = createEnumHelper(ProjectTier, exports.ProjectTierLabels);
function createEnumHelper(enumObj, labels) {
    return {
        values: () => Object.values(enumObj),
        pretty: (value) => labels[value] ?? value,
    };
}
//# sourceMappingURL=types.js.map