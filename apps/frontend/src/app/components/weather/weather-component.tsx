import { createMemo } from 'solid-js';

import defaultTemplate from './weather-component.njk?raw';
import { createTemplateElement } from '~/shared/template-parsing';
import { WeatherComponentConfig } from '~/shared/user-config';
import { WeatherStatus, useWeather } from '~/shared/providers/use-weather.hook';

export function WeatherComponent(props: { config: WeatherComponentConfig }) {
  const weather = useWeather(props.config.latitude, props.config.longitude);

  const bindings = createMemo(() => {
    return {
      variables: {
        celsius_temp: weather()?.celsiusTemp ?? 0,
        fahrenheit_temp: weather()?.fahrenheitTemp ?? 0,
        wind_speed: weather()?.windSpeed ?? 0,
        weather_status: weather()?.weatherStatus ?? WeatherStatus.CLEAR_DAY,
        WeatherStatus: WeatherStatus,
        root_props: `id="${props.config.id}" class="${props.config.class_name}"`,
      },
      slots: {
        default: props.config.slot,
      },
    };
  });

  return createTemplateElement({
    bindings,
    config: () => props.config,
    defaultTemplate: () => defaultTemplate,
  });
}