"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import React, {useCallback, useState} from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {useToast} from "@/hooks/use-toast"
import KanbanCard from "@/components/KanbanCard"

const FormSchema = z.object({
    name: z.string().min(1, {
        message: "Le Kanban doit avoir un nom",
    }).max(50, {
        message: "Le nom du Kanban ne doit pas dépasser 50 caractères",
    }),
})

interface AddKanbanProps {
    onAdd: (name: string) => void;
}

export default function AddKanban({ onAdd }: AddKanbanProps) {
    const [open, setOpen] = useState(false)
    const { toast } = useToast()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
        },
    })

    const formFieldRender = useCallback(({field}) => (
        <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
                <Input placeholder="Ajouter un nom" {...field} />
            </FormControl>
            <FormMessage/>
        </FormItem>
    ), []);

    function onSubmit(data: z.infer<typeof FormSchema>) {
        onAdd(data.name);
        toast({
            title: "Kanban créé",
            description: `Le Kanban "${data.name}" a été créé avec succès.`,
        })
        form.reset();
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button onClick={() => setOpen(true)}>
                    <KanbanCard title="+" description="Ajouter un Kanban" disableHover={true}/>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Créer un Kanban</DialogTitle>
                    <DialogDescription>
                        Ajoutez un nouveau tableau Kanban
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={formFieldRender}
                        />
                        <DialogFooter>
                            <Button type="submit">Créer</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}