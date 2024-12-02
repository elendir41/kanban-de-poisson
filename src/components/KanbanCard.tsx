import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const getPastelColor = (title: string = '') => {
    const colors: { [key: string]: string } = {
        'A': 'bg-pink-50', 'B': 'bg-blue-50', 'C': 'bg-green-50', 'D': 'bg-purple-50',
        'E': 'bg-yellow-50', 'F': 'bg-orange-50', 'G': 'bg-red-50', 'H': 'bg-indigo-50',
        'I': 'bg-pink-50', 'J': 'bg-blue-50', 'K': 'bg-green-50', 'L': 'bg-purple-50',
        'M': 'bg-yellow-50', 'N': 'bg-orange-50', 'O': 'bg-red-50', 'P': 'bg-indigo-50',
        'Q': 'bg-pink-50', 'R': 'bg-blue-50', 'S': 'bg-green-50', 'T': 'bg-purple-50',
        'U': 'bg-yellow-50', 'V': 'bg-orange-50', 'W': 'bg-red-50', 'X': 'bg-indigo-50',
        'Y': 'bg-pink-50', 'Z': 'bg-blue-50', '1': 'bg-teal-50', '2': 'bg-cyan-50',
        '3': 'bg-lime-50', '4': 'bg-amber-50', '5': 'bg-emerald-50', '6': 'bg-fuchsia-50',
        '7': 'bg-rose-50', '8': 'bg-sky-50', '9': 'bg-violet-50', '0': 'bg-slate-50'
    };
    const firstChar = title.charAt(0).toUpperCase();
    return colors[firstChar] || 'bg-gray-50';
};

const getFishImage = (title: string = '') => {
    const fishMap: { [key: string]: string } = {
        'A': 'fish1.svg', 'B': 'fish2.svg', 'C': 'fish3.svg', 'D': 'fish4.svg',
        'E': 'fish5.svg', 'F': 'fish6.svg', 'G': 'fish7.svg', 'H': 'fish8.svg',
        'I': 'fish9.svg', 'J': 'fish10.svg', 'K': 'fish11.svg', 'L': 'fish12.svg',
        'M': 'fish13.svg', 'N': 'fish14.svg', 'O': 'fish15.svg', 'P': 'fish16.svg',
        'Q': 'fish17.svg', 'R': 'fish18.svg', 'S': 'fish19.svg', 'T': 'fish20.svg',
        'U': 'fish1.svg', 'V': 'fish2.svg', 'W': 'fish3.svg', 'X': 'fish4.svg',
        'Y': 'fish5.svg', 'Z': 'fish6.svg', '1': 'fish7.svg', '2': 'fish8.svg',
        '3': 'fish9.svg', '4': 'fish10.svg', '5': 'fish11.svg', '6': 'fish12.svg',
        '7': 'fish13.svg', '8': 'fish14.svg', '9': 'fish15.svg', '0': 'fish16.svg'
    };
    const firstChar = title.charAt(0).toUpperCase();
    return fishMap[firstChar] || 'fish1.svg';
};

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Le Kanban doit avoir un nom",
    }).max(50, {
        message: "Le nom du Kanban ne doit pas dépasser 50 caractères",
    }),
    description: z.string().optional(),
});

export default function KanbanCard({ id, title, description, footer, editable, onDelete, disableHover }: {
    id: string;
    title?: string;
    description?: string;
    footer?: string;
    editable?: boolean;
    onDelete: () => void;
    disableHover?: boolean;
}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [kanbanName, setKanbanName] = useState(title);
    const [kanbanDescription, setKanbanDescription] = useState(description);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: kanbanName,
            description: kanbanDescription,
        },
    });

    const fishImage = getFishImage(title);
    const backgroundColor = getPastelColor(title);

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        setKanbanName(data.name);
        setKanbanDescription(data.description);
        setOpen(false);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
    };

    const confirmDelete = () => {
        onDelete();
        setDeleteDialogOpen(false);
    };

    const handleCardClick = () => {
        navigate(`/kanban/${id}`);
    };

    return (
        <Card className={`w-60 h-60 flex flex-col relative transition-colors duration-200 group ${backgroundColor} ${disableHover ? '' : 'hover:bg-opacity-75 cursor-pointer'}`} onClick={disableHover ? undefined : handleCardClick}>
            {editable && (
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M15.4998 5.49994L18.3282 8.32837M3 20.9997L3.04745 20.6675C3.21536 19.4922 3.29932 18.9045 3.49029 18.3558C3.65975 17.8689 3.89124 17.4059 4.17906 16.9783C4.50341 16.4963 4.92319 16.0765 5.76274 15.237L17.4107 3.58896C18.1918 2.80791 19.4581 2.80791 20.2392 3.58896C21.0202 4.37001 21.0202 5.63634 20.2392 6.41739L8.37744 18.2791C7.61579 19.0408 7.23497 19.4216 6.8012 19.7244C6.41618 19.9932 6.00093 20.2159 5.56398 20.3879C5.07171 20.5817 4.54375 20.6882 3.48793 20.9012L3 20.9997Z"
                                        stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Modifier le Kanban</DialogTitle>
                                <DialogDescription>
                                    Modifiez le nom du tableau Kanban
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                        Nom
                                    </label>
                                    <Input id="description" {...form.register("description")} />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" onClick={(e) => e.stopPropagation()}>Enregistrer</Button>
                                    <Button variant="ghost" onClick={(e) => { e.stopPropagation(); setOpen(false); }}>Annuler</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => { e.stopPropagation(); handleDelete(); }}>
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M4 6H20L18.4199 20.2209C18.3074 21.2337 17.4512 22 16.4321 22H7.56786C6.54876 22 5.69264 21.2337 5.5801 20.2209L4 6Z"
                                stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path
                                d="M7.34491 3.14716C7.67506 2.44685 8.37973 2 9.15396 2H14.846C15.6203 2 16.3249 2.44685 16.6551 3.14716L18 6H6L7.34491 3.14716Z"
                                stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2 6H22" stroke="#ff0000" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M10 11V16" stroke="#ff0000" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                            <path d="M14 11V16" stroke="#ff0000" strokeWidth="2" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </Button>
                </div>
            )}
            <CardHeader className="h-4/6 flex items-center justify-center pb-2">
                {title === "+" ? (
                    <CardTitle className="text-4xl">{title}</CardTitle>
                ) : (
                    <img src={`/public/${fishImage}`} alt={kanbanName} className="w-24 h-24" />
                )}
            </CardHeader>
            <Separator className="bg-gray-300"/>
            <CardContent className="flex-1 flex items-center justify-center py-4">
                <CardDescription className="text-base font-medium text-gray-700">
                    {kanbanDescription}
                </CardDescription>
            </CardContent>
            {footer && (
                <>
                    <CardFooter className="h-5 flex items-center justify-center">
                        <CardDescription className="text-xs text-gray-400 italic">
                            {footer}
                        </CardDescription>
                    </CardFooter>
                </>
            )}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                        <DialogDescription>
                            Êtes-vous sûr de vouloir supprimer ce Kanban ?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="destructive" onClick={(e) => { e.stopPropagation(); confirmDelete(); }}>Supprimer</Button>
                        <Button variant="ghost" onClick={(e) => { e.stopPropagation(); setDeleteDialogOpen(false); }}>Annuler</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}