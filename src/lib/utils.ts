import { DragData, TaksData } from "@/models/DragData.type";
import Response from "@/models/response.type";
import { DragEndEvent } from "@dnd-kit/core";
import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInDays, differenceInYears, format } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleRequestError<T>(error: unknown): Response<T> {
  if (isAxiosError(error)) {
    if (error.response) {
      return { error: error.response?.data };
    } else if (error.request) {
      console.error("Network error:", error.request);
      return {
        error: {
          message:
            "Une erreur réseau s'est produite. Veuillez réessayer plus tard ou vérifier votre connexion Internet.",
        },
      };
    } else {
      return { error: { message: "une erreur est survenu" } };
    }
  }
  return { error: { message: "une erreur est survenu" } };
}

export function extractId(id: string) {
  if (id.startsWith("column-")) {
    return id.replace("column-", "");
  } else if (id.startsWith("task-")) {
    return id.replace("task-", "");
  }
  return id;
}

type ValidateDragOverResponse = {
  overColumnId: string;
  activeCurrent: TaksData;
  overId: string;
  activeId: string;
};

export function validateDragOver(
  event: DragEndEvent
): ValidateDragOverResponse {
  const { active, over } = event;

  if (!over) {
    throw new Error("over is undefined");
  }

  if (active.id === over.id) {
    throw new Error("active and over are the same");
  }

  const activeCurrent = active.data.current as DragData;

  if (activeCurrent?.type !== "task") {
    throw new Error("active is not a task");
  }

  const overCurrent = over.data.current as DragData;
  if (!activeCurrent || !overCurrent) {
    throw new Error("active or over is undefined");
  }

  let overColumnId = undefined;

  if (overCurrent?.type === "task") {
    overColumnId = overCurrent.task.card.columnId;
  } else if (overCurrent?.type === "column") {
    overColumnId = overCurrent.column.column.id;
  }

  const activeColumnId = activeCurrent.task.card.columnId;
  if (!activeColumnId || !overColumnId) {
    throw new Error("activeColumnId or overColumnId is undefined");
  }

  if (activeColumnId === overColumnId) {
    throw new Error("activeColumnId and overColumnId are the same");
  }

  return {
    overColumnId,
    activeCurrent,
    overId: extractId(over.id.toString()),
    activeId: extractId(active.id.toString()),
  };
}

type ValidateDragEndResponse = {
  activeData: DragData;
  overData: DragData;
  activeId: string;
  overId: string;
};

export function validateDragEnd(event: DragEndEvent): ValidateDragEndResponse {
  const { active, over } = event;

  if (!over) {
    throw new Error("over is undefined");
  }

  if (active.id === over.id) {
    throw new Error("active and over are the same");
  }
  const overData = over.data.current as DragData;
  const activeData = active.data.current as DragData;

  return {
    activeData,
    overData,
    activeId: active.id.toString(),
    overId: over.id.toString(),
  };
}

export function formatUpdatedAt(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const daysDifference = differenceInDays(now, date);
  const yearsDifference = differenceInYears(now, date);

  if (daysDifference < 1) {
    return "aujourd'hui";
  }
  if (daysDifference < 6) {
    return `il y a ${daysDifference} jours`;
  } else if (yearsDifference < 1) {
    return format(date, "EEEE d MMMM", { locale: fr });
  } else {
    return format(date, "EEEE d MMMM yyyy", { locale: fr });
  }
}

export function getAbbreviatedTitle(title: string): string {
  const words = title.split(" ");
  if (words.length === 1) {
    return words[0][0];
  } else if (words.length === 2) {
    return words.map((word) => word[0]).join("");
  } else {
    return words
      .slice(0, 3)
      .map((word) => word[0])
      .join("");
  }
}
