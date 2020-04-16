import { moduleActionContext } from "..";
import { RootState } from "../typings";
import { ActionContext } from "vuex";
import {PersonalSetting, PersonalSettingsState} from "@/store/personalSettings/types";

const mod = {
  namespaced: true,
  state: {
    personalSettings: {} as PersonalSetting
  } as PersonalSettingsState,
  actions: {
    async loadPersonalSetting(
      context: ActionContext<PersonalSettingsState, RootState>,
      battleTag: string
    ) {
      const { commit, rootGetters } = moduleActionContext(context, mod);

      const response = await rootGetters.personalSettingsService.retrievePersonalSetting(battleTag);

      commit.SET_PERSONAL_SETTING(response);
    },

    async savePersonalSettings(
        context: ActionContext<PersonalSettingsState, RootState>,
        message: string
    ) {
      const { rootGetters } = moduleActionContext(context, mod);

      await rootGetters.personalSettingsService.setPersonalSettingMessage(message);
    }
  },
  mutations: {
    SET_PERSONAL_SETTING(state: PersonalSettingsState, setting: PersonalSetting) {
      state.personalSettings = setting;
    }
  }
} as const;

export default mod;
