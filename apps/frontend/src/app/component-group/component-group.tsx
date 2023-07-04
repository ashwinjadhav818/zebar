import { createEffect, on, onCleanup } from 'solid-js';

import template from './component-group.njk?raw';
import { ComponentGroupConfig } from '~/shared/user-config/user-config.model';
import { diffAndMutate } from '~/shared/utils/diff-and-mutate';
import { parseTemplate } from '~/shared/utils/parse-template';
import { ClockComponent } from '~/components/clock/clock-component';

export interface ComponentGroupProps {
  id: string;
  config: ComponentGroupConfig;
}

export function ComponentGroup(props: ComponentGroupProps) {
  const element = getParsedTemplate();

  createEffect(
    on(
      () => [
        props.config?.template_variables,
        props.config?.template_commands,
        props.config?.components,
      ],
      () => diffAndMutate(element, getParsedTemplate()),
    ),
  );

  function getParsedTemplate() {
    return parseTemplate(template, {
      bindings: {
        strings: {
          id: props.id,
        },
        components: {
          components: () => (
            // TODO: Avoid harcoding component + turn into array.
            <ClockComponent id="aaa" config={props.config.components[0]} />
          ),
        },
      },
    });
  }

  onCleanup(() => {
    console.log('cleanup'); // Never gets called.
  });

  return element;
}