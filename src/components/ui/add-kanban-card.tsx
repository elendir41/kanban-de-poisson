import { getPastelColor } from "@/lib/KanbanCardStyle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Separator } from "./separator";

type AddKanbanCardProps = {
  title: string;
};

export default function AddKanbanCard({ title }: AddKanbanCardProps) {
  const backgroundColor = getPastelColor(title);

  return (
    <Card
      className={`w-60 h-60 flex flex-col relative transition-colors duration-200 group ${backgroundColor}`}
    >
      <CardHeader className="h-4/6 flex items-center justify-center pb-2">
        <CardTitle className="text-4xl">+</CardTitle>
      </CardHeader>
      <Separator className="bg-gray-300" />
      <CardContent className="flex-1 flex items-center justify-center py-4">
        <CardDescription className="text-base font-medium text-gray-700">
          {title}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
