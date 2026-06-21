import { ProjectSliceCreator } from "../../types/project.store.types";

export const createProjectDataSlice: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    | "projects"
    | "currentProjectId"
    | "currentProjectName"
    | "currentProjectVersion"
    | "layers"
    | "pageBackground"
    | "pastStack"
    | "futureStack"
    | "pushHistory"
    | "undo"
    | "redo"
    | "saveSnapshot"
    | "updatePageBackground"
  >
> = (set, get) => ({
  projects: [],
  currentProjectId: null,
  currentProjectName: "Untitled Project",
  currentProjectVersion: 1,
  layers: [],
  pageBackground: { type: "color", color: "#ffffff" },
  pastStack: [],
  futureStack: [],

  pushHistory: () => {
    set((state) => {
      const newPast = [
        ...state.pastStack,
        {
          layers: JSON.parse(JSON.stringify(state.layers)),
          pageBackground: JSON.parse(JSON.stringify(state.pageBackground)),
        },
      ];
      if (newPast.length > 30) newPast.shift();
      return { pastStack: newPast, futureStack: [] };
    });
  },

  undo: () => {
    set((state) => {
      if (state.pastStack.length === 0) return state;
      const newPast = [...state.pastStack];
      const snapshot = newPast.pop()!;
      const newFuture = [
        ...state.futureStack,
        {
          layers: JSON.parse(JSON.stringify(state.layers)),
          pageBackground: JSON.parse(JSON.stringify(state.pageBackground)),
        },
      ];
      return {
        layers: snapshot.layers,
        pageBackground: snapshot.pageBackground,
        pastStack: newPast,
        futureStack: newFuture,
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.futureStack.length === 0) return state;
      const newFuture = [...state.futureStack];
      const snapshot = newFuture.pop()!;
      const newPast = [
        ...state.pastStack,
        {
          layers: JSON.parse(JSON.stringify(state.layers)),
          pageBackground: JSON.parse(JSON.stringify(state.pageBackground)),
        },
      ];
      return {
        layers: snapshot.layers,
        pageBackground: snapshot.pageBackground,
        pastStack: newPast,
        futureStack: newFuture,
      };
    });
  },

  saveSnapshot: () => {
    get().pushHistory();
  },

  updatePageBackground: (bg) =>
    set((state) => {
      const newPast = [
        ...state.pastStack,
        {
          layers: JSON.parse(JSON.stringify(state.layers)),
          pageBackground: JSON.parse(JSON.stringify(state.pageBackground)),
        },
      ];
      if (newPast.length > 30) newPast.shift();
      return {
        pageBackground: bg,
        pastStack: newPast,
        futureStack: [],
      };
    }),
});
