import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlanType = "month" | "year";

type PaywallState = {
  selectedPlan: PlanType;
};

const initialState: PaywallState = {
  selectedPlan: "year",
};

const paywallSlice = createSlice({
  name: "paywall",
  initialState,
  reducers: {
    setSelectedPlan(state, action: PayloadAction<PlanType>) {
      state.selectedPlan = action.payload;
    },
  },
});

export const { setSelectedPlan } = paywallSlice.actions;
export default paywallSlice.reducer;