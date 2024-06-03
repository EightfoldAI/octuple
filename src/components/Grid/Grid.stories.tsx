import React, { FC, useState } from 'react';
import { Stories } from '@storybook/addon-docs';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Grid, { Col, Row } from './';
import { Pill } from '../Pills';
import { Stack } from '../Stack';
import { Slider } from '../Slider';

export default {
  title: 'Grid',
  parameters: {
    docs: {
      page: (): JSX.Element => (
        <main>
          <article>
            <section>
              <h1>Grid</h1>
              <p>
                Our 12-column grid system is responsive, and the columns will
                rearrange depending on the screen size. It has a fixed gutter
                value, and a fixed margin value depending on device type to
                restructure the column layout best for the viewport width.
              </p>
              <p>
                The reason a 12-column grid is more popular than an 8 or 10
                columns grid is because of the variety of ways it can be
                divided: into columns of 1, 2, 3, 4, 6, or 12.
              </p>
            </section>
            <section>
              <Stories includePrimary title="" />
            </section>
          </article>
        </main>
      ),
    },
  },
  subcomponents: { Col },
} as ComponentMeta<typeof Row>;

const Basic_Story: ComponentStory<typeof Row> = (args) => (
  <div style={{ border: '1px solid var(--primary-secondary-color)' }}>
    <Row>
      <Col {...args} span={6} push={6}>
        col-6 1
      </Col>
      <Col {...args} span={6} pull={6}>
        col-6 2
      </Col>
    </Row>
    <Row>
      <Col {...args} span={4}>
        col-4
      </Col>
      <Col {...args} span={4}>
        col-4
      </Col>
      <Col {...args} span={4}>
        col-4
      </Col>
    </Row>
    <Row>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
    </Row>
    <Row>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
      <Col {...args} span={1}>
        col-1
      </Col>
    </Row>
  </div>
);

const style: React.CSSProperties = {
  background: 'var(--primary-color-40)',
  border: '2px solid var(--primary-secondary-color)',
  padding: '8px 0',
};

const Horizontal_Gutter_Story: ComponentStory<typeof Row> = (args) => (
  <Row gutter={16}>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
  </Row>
);

const Responsive_Gutter_Story: ComponentStory<typeof Row> = (args) => (
  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32, xl: 48 }}>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
  </Row>
);

const Vertical_Gutter_Story: ComponentStory<typeof Row> = (args) => (
  <Row gutter={[16, 16]}>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
    <Col {...args} span={3}>
      <div style={style}>col-3</div>
    </Col>
  </Row>
);

const Column_Offset_Story: ComponentStory<typeof Row> = (args) => (
  <div style={{ border: '1px solid var(--primary-secondary-color)' }}>
    <Row>
      <Col {...args} span={4}>
        col-4
      </Col>
      <Col {...args} span={4} offset={4}>
        col-4 col-offset-4
      </Col>
    </Row>
    <Row>
      <Col {...args} span={6} offset={6}>
        col-6 col-offset-6
      </Col>
      <Col {...args} span={6} offset={6}>
        col-6 col-offset-6
      </Col>
    </Row>
    <Row>
      <Col {...args} span={6} offset={2}>
        col-6 col-offset-2
      </Col>
    </Row>
  </div>
);

const Grid_Sort_Story: ComponentStory<typeof Row> = (args) => (
  <div style={{ border: '1px solid var(--primary-secondary-color)' }}>
    <Row>
      <Col {...args} span={8} push={4}>
        col-8 col-push-4
      </Col>
      <Col {...args} span={4} pull={8}>
        col-4 col-pull-8
      </Col>
    </Row>
  </div>
);

const Typesetting_Story: ComponentStory<typeof Row> = (args) => (
  <div style={{ border: '1px solid var(--primary-secondary-color)' }}>
    <Row justify="start">
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
    </Row>
    <Row justify="center">
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
    </Row>
    <Row justify="end">
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
    </Row>
    <Row justify="space-between">
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
    </Row>
    <Row justify="space-around">
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
    </Row>
    <Row justify="space-evenly">
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
      <Col {...args} span={2}>
        col-2
      </Col>
    </Row>
  </div>
);

const DemoBox: React.FC<{ children: React.ReactNode; value: number }> = (
  props
) => (
  <p
    style={{
      background: 'var(--primary-color-40)',
      border: '2px solid var(--primary-secondary-color)',
      height: `${props.value}px`,
    }}
  >
    {props.children}
  </p>
);

const Alignment_Story: ComponentStory<typeof Row> = (args) => (
  <>
    <Row justify="center" align="top">
      <Col {...args} span={2}>
        <DemoBox value={100}>col-2</DemoBox>
      </Col>
      <Col {...args} span={2}>
        <DemoBox value={50}>col-2</DemoBox>
      </Col>
      <Col {...args} span={2}>
        <DemoBox value={120}>col-2</DemoBox>
      </Col>
      <Col {...args} span={2}>
        <DemoBox value={80}>col-2</DemoBox>
      </Col>
    </Row>
    <Row justify="space-around" align="middle">
      <Col {...args} span={2}>
        <DemoBox value={100}>col-2</DemoBox>
      </Col>
      <Col {...args} span={2}>
        <DemoBox value={50}>col-2</DemoBox>
      </Col>
      <Col {...args} span={2}>
        <DemoBox value={120}>col-2</DemoBox>
      </Col>
      <Col {...args} span={2}>
        <DemoBox value={80}>col-2</DemoBox>
      </Col>
    </Row>
    <Row justify="space-between" align="bottom">
      <Col {...args} span={2}>
        <DemoBox value={100}>col-2</DemoBox>
      </Col>
      <Col {...args} span={2}>
        <DemoBox value={50}>col-2</DemoBox>
      </Col>
      <Col {...args} span={2}>
        <DemoBox value={120}>col-2</DemoBox>
      </Col>
      <Col {...args} span={2}>
        <DemoBox value={80}>col-2</DemoBox>
      </Col>
    </Row>
  </>
);

const Order_Normal_Story: ComponentStory<typeof Row> = (args) => (
  <Row>
    <Col {...args} span={3} order={4}>
      1 col-order-4
    </Col>
    <Col {...args} span={3} order={3}>
      2 col-order-3
    </Col>
    <Col {...args} span={3} order={2}>
      3 col-order-2
    </Col>
    <Col {...args} span={3} order={1}>
      4 col-order-1
    </Col>
  </Row>
);

const Order_Responsive_Story: ComponentStory<typeof Row> = (args) => (
  <Row>
    <Col
      {...args}
      span={3}
      xs={{ order: 1 }}
      sm={{ order: 2 }}
      md={{ order: 3 }}
      lg={{ order: 4 }}
      xl={{ order: 1 }}
    >
      1 col-order-responsive
    </Col>
    <Col
      {...args}
      span={3}
      xs={{ order: 2 }}
      sm={{ order: 1 }}
      md={{ order: 4 }}
      lg={{ order: 3 }}
      xl={{ order: 2 }}
    >
      2 col-order-responsive
    </Col>
    <Col
      {...args}
      span={3}
      xs={{ order: 3 }}
      sm={{ order: 4 }}
      md={{ order: 2 }}
      lg={{ order: 1 }}
      xl={{ order: 3 }}
    >
      3 col-order-responsive
    </Col>
    <Col
      {...args}
      span={3}
      xs={{ order: 4 }}
      sm={{ order: 3 }}
      md={{ order: 1 }}
      lg={{ order: 2 }}
      xl={{ order: 4 }}
    >
      4 col-order-responsive
    </Col>
  </Row>
);

const Percentage_Columns_Story: ComponentStory<typeof Row> = (args) => (
  <Row>
    <Col {...args} flex={2}>
      2 / 5
    </Col>
    <Col {...args} flex={3}>
      3 / 5
    </Col>
  </Row>
);

const Fill_Rest_Story: ComponentStory<typeof Row> = (args) => (
  <Row>
    <Col {...args} flex="100px">
      100px
    </Col>
    <Col {...args} flex="auto">
      Fill Rest
    </Col>
  </Row>
);

const Raw_Flex_Style_Story: ComponentStory<typeof Row> = (args) => (
  <>
    <Row>
      <Col {...args} flex="1 1 200px">
        1 1 200px
      </Col>
      <Col {...args} flex="0 1 300px">
        0 1 300px
      </Col>
    </Row>

    <Row wrap={false}>
      <Col {...args} flex="none">
        <div style={{ padding: '0 16px' }}>none</div>
      </Col>
      <Col {...args} flex="auto">
        auto with no-wrap
      </Col>
    </Row>
  </>
);

const Responsive_Story: ComponentStory<typeof Row> = (args) => (
  <Row>
    <Col
      {...args}
      xs={{ span: 3 }}
      sm={{ span: 4 }}
      md={{ span: 6 }}
      lg={{ span: 2 }}
      xl={{ span: 3 }}
    >
      Col
    </Col>
    <Col
      {...args}
      xs={{ span: 6 }}
      sm={{ span: 3 }}
      md={{ span: 1 }}
      lg={{ span: 8 }}
      xl={{ span: 6 }}
    >
      Col
    </Col>
    <Col
      {...args}
      xs={{ span: 3 }}
      sm={{ span: 5 }}
      md={{ span: 5 }}
      lg={{ span: 2 }}
      xl={{ span: 3 }}
    >
      Col
    </Col>
  </Row>
);

const { useBreakpoint } = Grid;

const useBreakPoint_Story: FC = () => {
  const screens = useBreakpoint();

  return (
    <Stack flexGap="m" direction="vertical">
      <div>Current break point:</div>
      <Stack flexGap="l" direction="horizontal">
        {Object.entries(screens)
          .filter((screen) => !!screen[1])
          .map((screen) => (
            <Pill label={screen[0]} theme="blue" key={screen[0]} />
          ))}
      </Stack>
    </Stack>
  );
};

const gutters: Record<string, number> = {};
const vgutters: Record<string, number> = {};
const colCounts: Record<string, number> = {};

[8, 16, 24, 32, 48].forEach((value: number, i: number) => {
  gutters[i] = value;
});
[8, 16, 24, 32, 48].forEach((value: number, i: number) => {
  vgutters[i] = value;
});
[2, 3, 4, 6, 8, 12].forEach((value: number, i: number) => {
  colCounts[i] = value;
});

const Playground_Story: FC = () => {
  const [gutterKey, setGutterKey] = useState(1);
  const [vgutterKey, setVgutterKey] = useState(1);
  const [colCountKey, setColCountKey] = useState(2);

  const cols = [];
  const colCount: number = colCounts[colCountKey];
  let colCode = '';
  for (let i: number = 0; i < colCount; i++) {
    cols.push(
      <Col
        key={i.toString()}
        span={12 / colCount}
        style={{ textAlign: 'center' }}
      >
        <div style={style}>Column</div>
      </Col>
    );
    colCode += `  <Col span={${12 / colCount}} />\n`;
  }

  return (
    <Stack direction="vertical" flexGap="l" justify="flex-start" fullWidth>
      <span>Horizontal Gutter: </span>
      <div style={{ width: '50%' }}>
        <Slider
          min={0}
          max={Object.keys(gutters).length - 1}
          value={gutterKey}
          onChange={(value: number) => setGutterKey(value)}
          showLabels={false}
        />
      </div>
      <span>Vertical Gutter: </span>
      <div style={{ width: '50%' }}>
        <Slider
          min={0}
          max={Object.keys(vgutters).length - 1}
          value={vgutterKey}
          onChange={(value: number) => setVgutterKey(value)}
          showLabels={false}
        />
      </div>
      <span>Column Count:</span>
      <div style={{ width: '50%' }}>
        <Slider
          min={0}
          max={Object.keys(colCounts).length - 1}
          value={colCountKey}
          onChange={(value: number) => setColCountKey(value)}
          showLabels={false}
        />
      </div>
      <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>
        {cols}
        {cols}
      </Row>
      <div>Another Row:</div>
      <Row gutter={[gutters[gutterKey], vgutters[vgutterKey]]}>{cols}</Row>
      <pre className="demo-code">{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}\n${colCode}</Row>`}</pre>
      <pre className="demo-code">{`<Row gutter={[${gutters[gutterKey]}, ${vgutters[vgutterKey]}]}>\n${colCode}</Row>`}</pre>
    </Stack>
  );
};

export const Basic = Basic_Story.bind({});
export const Horizontal_Gutter = Horizontal_Gutter_Story.bind({});
export const Responsive_Gutter = Responsive_Gutter_Story.bind({});
export const Vertical_Gutter = Vertical_Gutter_Story.bind({});
export const Column_Offset = Column_Offset_Story.bind({});
export const Grid_Sort = Grid_Sort_Story.bind({});
export const Typesetting = Typesetting_Story.bind({});
export const Alignment = Alignment_Story.bind({});
export const Order_Normal = Order_Normal_Story.bind({});
export const Order_Responsive = Order_Responsive_Story.bind({});
export const Percentage_Columns = Percentage_Columns_Story.bind({});
export const Fill_Rest = Fill_Rest_Story.bind({});
export const Raw_Flex_Style = Raw_Flex_Style_Story.bind({});
export const Responsive = Responsive_Story.bind({});
export const useBreakPoint = useBreakPoint_Story.bind({});
export const Playground = Playground_Story.bind({});

// Storybook 6.5 using Webpack >= 5.76.0 automatically alphabetizes exports,
// this line ensures they are exported in the desired order.
// See https://www.npmjs.com/package/babel-plugin-named-exports-order
export const __namedExportsOrder = [
  'Basic',
  'Horizontal_Gutter',
  'Responsive_Gutter',
  'Vertical_Gutter',
  'Column_Offset',
  'Grid_Sort',
  'Typesetting',
  'Alignment',
  'Order_Normal',
  'Order_Responsive',
  'Percentage_Columns',
  'Fill_Rest',
  'Raw_Flex_Style',
  'Responsive',
  'useBreakPoint',
  'Playground',
];

const basicArgs: Object = {
  style: {
    background: 'var(--primary-color-40)',
    border: '1px solid var(--primary-secondary-color)',
    padding: '16px 0',
    textAlign: 'center',
  },
};

Basic.args = {
  ...basicArgs,
};

Horizontal_Gutter.args = {
  ...basicArgs,
  style: {
    textAlign: 'center',
  },
};

Responsive_Gutter.args = {
  ...basicArgs,
  style: {
    textAlign: 'center',
  },
};

Vertical_Gutter.args = {
  ...basicArgs,
  style: {
    textAlign: 'center',
  },
};

Column_Offset.args = {
  ...basicArgs,
};

Grid_Sort.args = {
  ...basicArgs,
};

Typesetting.args = {
  ...basicArgs,
};

Alignment.args = {
  ...basicArgs,
  style: {
    textAlign: 'center',
  },
};

Order_Normal.args = {
  ...basicArgs,
};

Order_Responsive.args = {
  ...basicArgs,
};

Percentage_Columns.args = {
  ...basicArgs,
};

Fill_Rest.args = {
  ...basicArgs,
};

Raw_Flex_Style.args = {
  ...basicArgs,
};

Responsive.args = {
  ...basicArgs,
};
