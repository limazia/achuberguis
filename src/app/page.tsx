"use client";

import { useState, ChangeEvent } from "react";
import { Loader2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";

import ImagePreview from "@/assets/clean.png";

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

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Digite um nome" })
    .max(50, { message: "O nome pode ter no máximo 50 caracteres" }),

  tags: z
    .array(z.string())
    .min(3, { message: "Pelo menos três habilidades são necessárias" })
    .max(10, { message: "Você pode adicionar no máximo 10 habilidades" }),

  nickname: z
    .array(z.string())
    .min(1, { message: "Pelo menos um apelido é necessário" })
    .max(5, { message: "Você pode adicionar no máximo 5 apelidos" }),

  affiliation: z
    .array(z.string())
    .min(1, { message: "Pelo menos uma afiliação é necessária" })
    .max(3, { message: "Você pode adicionar no máximo 3 afiliações" }),

  priorities: z
    .array(z.string())
    .min(1, { message: "Selecione pelo menos uma prioridade" }),

  category: z.string().min(1, { message: "Selecione uma categoria" }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function Home() {
  const [photo, setPhoto] = useState("");

  const {
    handleSubmit,
    register,
    control,
    watch,

    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setPhoto(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  async function handleSend(data: FormSchema) {
    console.log(data);
  }

  const data = watch();

  return (
    <div className="container p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="w-full">
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
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" disabled={isSubmitting} {...register("name")} />

              {errors.name && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">Vulgo de Putão</Label>
                <Controller
                  control={control}
                  name="nickname"
                  render={({ field }) => (
                    <InputTags {...field} disabled={isSubmitting} limit={3} />
                  )}
                />

                {errors.nickname && (
                  <p className="text-sm font-medium text-red-500 dark:text-red-400">
                    {errors.nickname.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="affiliation">Afiliação</Label>

                <Controller
                  control={control}
                  name="affiliation"
                  render={({ field }) => (
                    <InputTags {...field} disabled={isSubmitting} limit={3} />
                  )}
                />

                {errors.affiliation && (
                  <p className="text-sm font-medium text-red-500 dark:text-red-400">
                    {errors.affiliation.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
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

            <div className="space-y-2">
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
                  <RadioGroupItem value="aradorDeXoxota" id="aradorDeXoxota" />
                  <Label htmlFor="aradorDeXoxota">Arador de xoxota</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Foto</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
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

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Pré-visualização</CardTitle>
          <CardDescription>
            Veja como está ficando sua carteirinha!
          </CardDescription>
        </CardHeader>
        <CardContent className="relative mt-2 overflow-hidden">
          <div className="w-card h-card border-2 border-red-500 p-3 bg-gray-100">
            <div className="w-card h-card border-[3px] border-black rounded-md">
              <div className="rounded-md bg-gradient-to-b from-yellow-100/90 via-yellow-200/80 to-yellow-300 h-64 p-4 w-full">
                <div className="size-8 border-2 border-red-500 p-4">
                  {photo && (
                    <div className="absolute top-[25px] left-[50px]">
                      <Image
                        src={photo}
                        alt="Foto"
                        className="w-[53px] h-[53px] rounded-md"
                        width={53}
                        height={53}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Image
            src={ImagePreview}
            alt="Prévia"
            className="w-full h-auto mt-5"
          />

          {photo && (
            <div className="absolute top-[25px] left-[50px]">
              <Image
                src={photo}
                alt="Foto"
                className="w-[53px] h-[53px] rounded-md"
                width={53}
                height={53}
              />
            </div>
          )}

          {data?.name && data?.name.length > 0 && (
            <div className="absolute top-[115px] left-[50px]">
              <span className="text-black text-xs font-bold uppercase">
                {data?.name}
              </span>
            </div>
          )}

          {data?.affiliation && data?.affiliation.length > 0 && (
            <div className="absolute top-[170px] left-[50px]">
              <span className="text-black text-xs font-bold uppercase">
                {data?.affiliation?.map((affiliation, index) => (
                  <p key={index}>{affiliation}</p>
                ))}
              </span>
            </div>
          )}

          {data?.nickname && data?.nickname.length > 0 && (
            <div className="absolute top-[120px] left-[205px]">
              <span className="text-black text-xs font-bold uppercase">
                {data?.nickname?.map((nick, index) => (
                  <p key={index}>{nick}</p>
                ))}
              </span>
            </div>
          )}

          {data?.priorities && data?.priorities.length > 0 && (
            <div className="absolute top-[220px] left-[50px]">
              <span className="text-black text-xs font-bold uppercase">
                {data?.priorities?.join(", ")}
              </span>
            </div>
          )}

          {data?.category && data?.category.length > 0 && (
            <div className="absolute top-[250px] left-[50px]">
              <span className="text-black text-xs font-bold uppercase">
                {data?.category}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
