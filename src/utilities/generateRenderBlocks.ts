interface Block {
  blockType: string
  blockConfig: any
  order: number
}

export function generateRenderBlocks(selectedBlocks: Block[]): string {
  // Check if we have npm components
  const hasFeatureCard = selectedBlocks.some(b => b.blockType === 'featureCard')
  const hasSampleButton = selectedBlocks.some(b => b.blockType === 'sampleButton')

  const npmImports = []
  const npmMappings = []

  if (hasFeatureCard) {
    npmImports.push(`import { FeatureCard } from '@huce-digital/sample-block'`)
    npmMappings.push(`  featureCard: FeatureCard,`)
  }

  if (hasSampleButton) {
    npmImports.push(`import { SampleButton } from '@huce-digital/sample-button'`)
    npmMappings.push(`  sampleButton: SampleButton,`)
  }

  const npmImportsStr = npmImports.length > 0 ? '\n' + npmImports.join('\n') : ''
  const npmMappingsStr = npmMappings.length > 0 ? '\n' + npmMappings.join('\n') : ''

  return `import React, { Fragment } from "react";

import type { Page } from "@/payload-types";

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { ContentSectionBlock } from "@/blocks/ContentSection/Component";
import { SuitableApplicationsBlock } from "@/blocks/SuitableApplications/Component";
import { FAQBlock } from "@/blocks/FAQ/Component";
import { FeatureBlock } from "@/blocks/FeatureBlock/Component";
import { TextWithImageBlock } from "@/blocks/TextWithImage/Component";
import { ProcessBlock } from "@/blocks/Process/Component";
import { CardsCarouselBlock } from "./CardsCarouselBlock/Component";
import { MarqueeBlock } from "./MarqueeBlock/Component";
import { ImageCarouselBlock } from "./ImageCarousel/Component";
import { TeamSectionBlock } from "./TeamSection/Component";
import { ReviewsBlock } from "./Reviews/Component";${npmImportsStr}

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  imageCarousel: ImageCarouselBlock,
  contentsection: ContentSectionBlock,
  suitableapplications: SuitableApplicationsBlock,
  faq: FAQBlock,
  process: ProcessBlock,
  feature: FeatureBlock,
  textWithImage: TextWithImageBlock,
  cardsCarousel: CardsCarouselBlock,
  marquee: MarqueeBlock,
  teamSection: TeamSectionBlock,
  reviews: ReviewsBlock,${npmMappingsStr}
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
  isHome?: boolean;
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              if (props.isHome) {
                return (
                  <div
                    className=""
                    key={index}
                  >
                    <div
                      className={\`\${
                        blockType === "marquee" ||
                        blockType === "feature"
                          ? "col-span-12 bg-none"
                          : "container mx-auto py-16 "
                      }\`}
                    >
                      {/* @ts-expect-error there may be some mismatch between the expected types here */}
                      <Block {...block} disableInnerContainer />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  className={\`py-16 flex flex-col items-center \${blockType === "marquee" ? "col-span-12" : ""}\`}
                  key={index}
                >
                  <div className="container">
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} disableInnerContainer />
                  </div>
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
`
}
