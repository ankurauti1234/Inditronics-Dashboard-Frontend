import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ChartContainer = ({ title, children }) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">{children}</div>
      </CardContent>
    </Card>
  );
};

export default ChartContainer;
