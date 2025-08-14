import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const SpecialOfferView = () => {
  const offers = [
    {
      id: 1,
      title: "FPA Exam Discount",
      description: "Get 30% off your Financial Planning Assessment exam registration",
      benefit: "Save $150 on certification",
      shape: "rounded-tl-3xl rounded-br-3xl",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "EEA Bundle Special",
      description: "Complete Economic Evaluation Assessment package with study materials",
      benefit: "20% off full bundle + bonus materials",
      shape: "rounded-tr-3xl rounded-bl-3xl",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200"
    },
    {
      id: 3,
      title: "Team Certification",
      description: "Group rates for teams of 5 or more participants",
      benefit: "Up to 40% savings per member",
      shape: "rounded-3xl",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200"
    }
  ];

  return (
    <div className="w-full flex items-center justify-center min-h-[60vh]">
      <div className="w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {offers.map((offer) => (
        <Card 
          key={offer.id} 
          className={`${offer.shape} ${offer.bgColor} border-2 ${offer.borderColor} shadow-lg hover:shadow-xl transition-shadow duration-300`}
        >
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{offer.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {offer.description}
              </p>
              <div className="bg-white/70 rounded-lg p-3 mb-6">
                <p className="text-sm font-semibold text-primary">
                  {offer.benefit}
                </p>
              </div>
            </div>
            <Button 
              className="w-full font-semibold"
              variant="default"
            >
              Book Now
            </Button>
          </CardContent>
        </Card>
      ))}
        </div>
      </div>
    </div>
  );
};