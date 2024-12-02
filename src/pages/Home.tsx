import {useState} from "react";
import AddKanban from "@/components/AddKanban.tsx";
import KanbanCard from "@/components/KanbanCard.tsx";
import {differenceInDays, differenceInYears, format} from "date-fns";
import {fr} from "date-fns/locale";

const initialList = [
    {
        "id": "string1",
        "version": 0,
        "createdAt": "2024-11-20T14:27:36.711Z",
        "updatedAt": "2024-11-18T14:27:36.711Z",
        "name": "Aeci est un titre",
        "userId": "string"
    },
    {
        "id": "string2",
        "version": 0,
        "createdAt": "2024-11-20T14:27:36.711Z",
        "updatedAt": "2024-11-10T14:27:36.711Z",
        "name": "Best",
        "userId": "string"
    },
    {
        "id": "string3",
        "version": 0,
        "createdAt": "2024-11-20T14:27:36.711Z",
        "updatedAt": "2022-11-18T14:27:36.711Z",
        "name": "Ch bon?",
        "userId": "string"
    },
];

function getAbbreviatedTitle(title: string): string {
    const words = title.split(' ');
    if (words.length === 1) {
        return words[0][0];
    } else if (words.length === 2) {
        return words.map(word => word[0]).join('');
    } else {
        return words.slice(0, 3).map(word => word[0]).join('');
    }
}

function formatUpdatedAt(dateString: string): string {
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
        return format(date, "EEEE d MMMM", {locale: fr});
    } else {
        return format(date, "EEEE d MMMM yyyy", {locale: fr});
    }
}

export default function Home() {
    const [list, setList] = useState(initialList);

    const handleDelete = (id: string) => {
        setList(list.filter(kanban => kanban.id !== id));
    };

    const handleAdd = (name: string) => {
        const newKanban = {
            id: `string${Date.now()}`,
            version: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            name: name,
            userId: "string"
        };
        setList([newKanban, ...list]);
    };

    return (
        <div className="p-2 flex flex-wrap">
            <div className="p-2">
                <AddKanban onAdd={handleAdd} />
            </div>
            {list.map((kanban, index) => (
                <div className="p-2" key={`${kanban.id}-${index}`}>
                    <KanbanCard
                        id={kanban.id}
                        title={getAbbreviatedTitle(kanban.name)}
                        description={kanban.name}
                        footer={formatUpdatedAt(kanban.updatedAt)}
                        editable={true}
                        onDelete={() => handleDelete(kanban.id)}
                    />
                </div>
            ))}
        </div>
    );
}