import type { FAQBlock as FAQProps } from '@/payload-types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

{
  /* FAQ Section */
}
export const FAQBlock: React.FC<FAQProps> = ({ title, questions, type }) => {
  if (type === 'style1') {
  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      <h2 className="text-5xl  text-center mb-8 font-sans">{title}</h2>

      <Accordion type="single" collapsible className="w-full">
        {questions.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
  }
  if (type === 'style2') {
    return (
      <section className="w-full py-16 px-4 md:px-6 lg:px-0">
        <div className="">
          <h2 className="mb-6 font-sans text-4xl font text-foreground lg:text-6xl max-w-[640px]">
            {title} 
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {questions.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-t last:border-b"
              >
                <AccordionTrigger className="text-left text-lg md:text-xl font-semibold py-5 pr-1 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base md:text-lg text-muted-foreground pb-7 pr-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    )
  }
}
