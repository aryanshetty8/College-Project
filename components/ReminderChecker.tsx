"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ReminderChecker() {
  const checkReminders = useMutation(
    api.reminder.checkAndSendReminders
  );

  useEffect(() => {
    checkReminders();
  }, [checkReminders]);

  return null;
}
