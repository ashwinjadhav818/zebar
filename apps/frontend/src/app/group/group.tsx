import { createMemo } from 'solid-js';

import defaultTemplate from './group.njk?raw';
import { ClockComponent } from '~/components/clock/clock-component';
import { CpuComponent } from '~/components/cpu/cpu-component';
import { GlazeWMComponent } from '~/components/glazewm/glazewm-component';
import { WeatherComponent } from '~/components/weather/weather-component';
import { createTemplateElement } from '~/shared/template-parsing';
import { ComponentConfig, GroupConfig } from '~/shared/user-config';

export function Group(props: { config: GroupConfig }) {
  function getComponentType(componentConfig: ComponentConfig) {
    switch (componentConfig.type) {
      case 'clock':
        return <ClockComponent config={componentConfig} />;
      case 'cpu':
        return <CpuComponent config={componentConfig} />;
      case 'glazewm':
        return <GlazeWMComponent config={componentConfig} />;
      case 'weather':
        return <WeatherComponent config={componentConfig} />;
    }
  }

  const bindings = createMemo(() => {
    return {
      variables: {
        root_props: `id="${props.config.id}" class="${props.config.class_name}"`,
      },
      components: {
        components: () => props.config.components.map(getComponentType),
      },
    };
  });

  return createTemplateElement({
    bindings,
    config: () => props.config,
    defaultTemplate: () => defaultTemplate,
  });
}