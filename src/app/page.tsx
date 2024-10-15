"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputTags } from "@/components/ui/input-tags";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Digite um nome" }),
  tags: z
    .array(z.string())
    .min(1, "Pelo menos três habilidades são necessárias"),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Home() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const [imagePreview, setImagePreview] = useState(
    "/placeholder.svg?height=400&width=800"
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSend(data: FormSchema) {
    try {
      console.log(data);
    } catch (error) {
      alert("Erro ao gerar carteirinha!");
    }
  }

  return (
    <div className="container mx-auto p-4 grid grid-cols-2 gap-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>ACHUBERGUIS</CardTitle>
          <CardDescription className="uppercase">
            Associação dos chupadores de buceta de São Paulo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(handleSend)}
            method="POST"
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    disabled={isSubmitting}
                    {...register("name")}
                  />
                </div>
                <div>
                  <Label htmlFor="vulgo">Vulgo de Putão</Label>
                  <Controller
                    control={control}
                    name="tags"
                    disabled={isSubmitting}
                    render={({ field }) => <InputTags {...field} />}
                  />

                  {errors.tags && (
                    <p className="text-sm font-medium text-red-500 dark:text-red-400">
                      {errors.tags.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="afiliacao">Afiliação</Label>
                  <Input id="afiliacao" name="afiliacao" />
                </div>
                <div>
                  <Label>Categoria</Label>
                  <RadioGroup defaultValue="iniciante">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="iniciante" id="iniciante" />
                      <Label htmlFor="iniciante">Iniciante</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="amador" id="amador" />
                      <Label htmlFor="amador">Amador</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="profissional" id="profissional" />
                      <Label htmlFor="profissional">Profissional</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="aradorDeXoxota"
                        id="aradorDeXoxota"
                      />
                      <Label htmlFor="aradorDeXoxota">Arador de xoxota</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label>Prioridades</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prioridade1" />
                      <label htmlFor="prioridade1" className="text-sm">
                        Nunca parar no meio da chupada
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prioridade2" />
                      <label htmlFor="prioridade2" className="text-sm">
                        Nunca queixar-se do odor da xereca
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prioridade3" />
                      <label htmlFor="prioridade3" className="text-sm">
                        Nunca babar no cu da puta que está sendo chupada
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="prioridade4" />
                      <label htmlFor="prioridade4" className="text-sm">
                        No caso de babar o cu é obrigatório chupá-lo também
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="photo">Foto</Label>
                  <Input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-14 text-white bg-purple-500 hover:bg-purple-600 font-bold text-base"
              disabled={isSubmitting || !isDirty || !isValid}
            >
              {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
              Gerar Carteirinha
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Pré-visualização</CardTitle>
          <CardDescription className="uppercase">
            Associação dos chupadores de buceta de São Paulo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mt-2 border border-gray-300 rounded-lg overflow-hidden">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-auto"
              style={{ maxWidth: "800px", maxHeight: "400px" }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
