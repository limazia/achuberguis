import SP from "@/assets/sp.png";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function Home() {
  return (
    <Card className="w-card h-card p-6 bg-[#f4f1e4] border-4 border-red-600 flex shadow-lg overflow-hidden relative">
      <div
        className="absolute inset-0 bg-opacity-50 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='50' cy='50' r='3'/%3E%3Ccircle cx='0' cy='0' r='3'/%3E%3Ccircle cx='100' cy='0' r='3'/%3E%3Ccircle cx='0' cy='100' r='3'/%3E%3Ccircle cx='100' cy='100' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="flex-1 border-r border-gray-400 pr-4 relative">
        <header className="flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-red-800">ACHUBERGUIS</h2>
            <p className="text-[10px] font-semibold">
              ASSOCIAÇÃO DOS AMIGOS DE SÃO PAULO
            </p>
          </div>

          <Image
            src={SP}
            alt="São Paulo"
            className="object-cover"
            width={48}
            height={48}
          />
        </header>

        <div className="w-24 h-24 bg-yellow-300 mb-3 border border-gray-400"></div>
        <form className="space-y-2">
          <div>
            <Label htmlFor="nome" className="text-xs font-semibold">
              NOME
            </Label>
            <Input id="nome" className="h-7 text-sm" />
          </div>
          <div>
            <Label htmlFor="vulgo" className="text-xs font-semibold">
              VULGO DE Pasdas
            </Label>
            <Input id="vulgo" className="h-7 text-sm" />
          </div>
          <div>
            <Label htmlFor="afiliacao" className="text-xs font-semibold">
              AFILIAÇÃO
            </Label>
            <Input id="afiliacao" className="h-7 text-sm" />
          </div>
        </form>
        <p className="text-[10px] mt-2 absolute bottom-0 left-0">
          Validade Nacional
        </p>
      </div>

      {/* Right side */}
      <div className="flex-1 pl-4 relative">
        <header className="flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-red-800">ACHUBERGUIS</h2>
            <p className="text-[10px] font-semibold">
              ASSOCIAÇÃO DOS AMIGOS DE SÃO PAULO
            </p>
          </div>

          <Image
            src={SP}
            alt="São Paulo"
            className="object-cover"
            width={48}
            height={48}
          />
        </header>

        <div className="space-y-2">
          <div className="flex flex-col">
            <h4 className="font-semibold mb-1 text-sm">Prioridades</h4>
            <div className="flex flex-col text-xs space-y-1">
              <span>- Nunca parar no meio da chupada</span>
              <span>- Nunca queixar-se do odor da xereca</span>
              <span>- Nunca babar no cu da puta que está sendo chupada</span>
              <span>- No caso de babar o cu é obrigatório chupá-lo também</span>
            </div>
          </div>

          <div className="flex flex-col">
            <h4 className="font-semibold mb-1 text-sm">Categoria</h4>
            <div className="space-y-1">
              {["Iniciante", "Médio", "Profissional", "Arador de xoxota"].map(
                (category) => (
                  <div key={category} className="flex items-center">
                    <Checkbox id={category.toLowerCase()} />
                    <label
                      htmlFor={category.toLowerCase()}
                      className="text-xs ml-2"
                    >
                      {category}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <p className="text-[10px] mt-2 absolute bottom-0 left-4">
          Validade Nacional
        </p>
      </div>
    </Card>
  );
}
