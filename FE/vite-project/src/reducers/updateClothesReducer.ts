export const ACTION_TYPES = {
  set: "set",
  updateClothingName: "updateClothingName",
  updateCategory: "updateCategory",
  updateTexture: "updateTexture",
  deleteTexture: "deleteTexture",
  toggleMonth: "toggleMonth",
  updateStyle: "updateStyle",
  deleteStyle: "deleteStyle",
};

export const initialState = {
  clothingId: 0,
  clothingName: "",
  category: "string",
  styles: ["string"],
  seasons: [0],
  clothingImgPath: "string",
  textures: ["string"],
  sharedUsers: [
    {
      userId: 0,
      userName: "string",
    },
  ],
  isMyClothing: true,
};

export const clothesreducer = (state, action) => {
  console.log("reducer 작동");
  switch (action.type) {
    case ACTION_TYPES.set:
      return { ...action.payload };
    case ACTION_TYPES.updateClothingName:
      return { ...state, clothingName: action.payload };
    case ACTION_TYPES.updateCategory:
      return { ...state, category: action.payload };
    case ACTION_TYPES.updateTexture:
      return { ...state, textures: action.payload };
    case ACTION_TYPES.deleteTexture: {
      const updatedTextures = state.textures.filter(
        (texture) => texture !== action.payload
      );
      return { ...state, textures: updatedTextures };
    }

    case ACTION_TYPES.toggleMonth: {
      const updatedSeasons = state.seasons.includes(action.payload)
        ? state.seasons.filter((season) => season !== action.payload)
        : [...state.seasons, action.payload];
      return { ...state, seasons: updatedSeasons };
    }

    case ACTION_TYPES.updateStyle:
      return { ...state, styles: action.payload };
    case ACTION_TYPES.deleteStyle: {
      const updatedStyles = state.styles.filter(
        (style) => style !== action.payload
      );
      return { ...state, styles: updatedStyles };
    }

    default:
      return state;
  }
};
