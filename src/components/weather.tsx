import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getWeatherInfo } from "../api/get-weather-info";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const searchSchema = z.object({
  search: z.string(),
});
type SearchSchema = z.infer<typeof searchSchema>;

export function Weather() {
  const { handleSubmit, register } = useForm<SearchSchema>();
  const mutation = useMutation({
    mutationFn: (search: string) => getWeatherInfo(search),
  });

  function handleSearchCity(data: SearchSchema) {
    mutation.mutate(data.search);
  }
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="border flex-col flex gap-2  max-w-[660px] h-[440px]">
        <CardHeader>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter a City Name"
              {...register("search")}
            />
            <Button onClick={handleSubmit(handleSearchCity)} variant="outline">
              Search City
            </Button>
          </div>
        </CardHeader>
        {mutation.isSuccess && (
          <CardContent className="flex flex-col items-center space-y-12">
            <div className="flex flex-col items-center">
              <h3 className="font-bold">
                {mutation.data.name}, {mutation.data.sys.country}
              </h3>
              <p>
                {format(new Date(), "cccc , MMMM d , yyyy ", { locale: ptBR })}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-bold text-4xl">{mutation.data.main.temp}</h1>
              <p className="font-semibold">
                {mutation.data.weather[0].description}
              </p>
            </div>

            <div className="flex  justify-between gap-24 items-center">
              <div className="flex items-center flex-col">
                <span className="font-bold">{mutation.data.wind.speed}</span>
                <span>Wind Speed</span>
              </div>
              <div className="flex items-center flex-col">
                <span className="font-bold">
                  {mutation.data.main.humidity}%
                </span>
                <span>Humidity</span>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
