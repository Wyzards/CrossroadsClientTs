"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectTypeHelper = exports.ProjectType = exports.ProjectStatusHelper = exports.ProjectStatus = exports.ProjectStaffRankHelper = exports.ProjectStaffRank = void 0;
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
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["PLAYABLE"] = "playable";
    ProjectStatus["IN_DEVELOPMENT"] = "in_development";
    ProjectStatus["ARCHIVED"] = "archived";
    ProjectStatus["HIDDEN"] = "hidden";
})(ProjectStatus || (exports.ProjectStatus = ProjectStatus = {}));
class ProjectStatusHelper {
    static pretty(status) {
        switch (status) {
            case ProjectStatus.PLAYABLE: return "Playable";
            case ProjectStatus.IN_DEVELOPMENT: return "In Development";
            case ProjectStatus.ARCHIVED: return "Archived";
            case ProjectStatus.HIDDEN: return "Hidden";
        }
    }
    static values() {
        return [
            ProjectStatus.PLAYABLE,
            ProjectStatus.IN_DEVELOPMENT,
            ProjectStatus.ARCHIVED,
            ProjectStatus.HIDDEN,
        ];
    }
}
exports.ProjectStatusHelper = ProjectStatusHelper;
var ProjectType;
(function (ProjectType) {
    ProjectType["MMO"] = "mmo";
    ProjectType["SMP"] = "smp";
    ProjectType["MAP"] = "map";
    ProjectType["RPG"] = "rpg";
    ProjectType["OTHER"] = "other";
})(ProjectType || (exports.ProjectType = ProjectType = {}));
class ProjectTypeHelper {
    static pretty(status) {
        switch (status) {
            case ProjectType.MMO: return "MMO";
            case ProjectType.SMP: return "SMP";
            case ProjectType.MAP: return "Map";
            case ProjectType.RPG: return "RPG";
            case ProjectType.OTHER: return "Other";
        }
    }
    static values() {
        return [
            ProjectType.MMO,
            ProjectType.SMP,
            ProjectType.RPG,
            ProjectType.MAP,
            ProjectType.OTHER
        ];
    }
}
exports.ProjectTypeHelper = ProjectTypeHelper;
//# sourceMappingURL=types.js.map