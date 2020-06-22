import { Formio } from '../Formio';
import { Templates } from '../templates';
import { Components } from '../components';
import { Providers } from '../providers';
import { Displays } from '../displays';
import { Builders } from '../builders';
import {
  Conjunctions,
  Operators,
  QuickRules,
  Rules,
  Transformers,
  ValueSources
} from '../validator';

const registerPlugin = (plugin) => {
  // Sanity check.
  if (typeof plugin !== 'object') {
    return;
  }
  for (const key of Object.keys(plugin)) {
    const current = plugin.framework || Templates.framework || 'bootstrap';
    switch (key) {
      case 'options':
        Formio.options = plugin.options;
        break;
      case 'templates':
        for (const framework of Object.keys(plugin.templates)) {
          Templates.extendTemplate(framework, plugin.templates[framework]);
        }
        if (plugin.templates[current]) {
          Templates.current = plugin.templates[current];
        }
        break;
      case 'components':
        Components.setComponents(plugin.components);
        break;
      case 'framework':
        Templates.framework = plugin.framework;
        break;
      case 'fetch':
        for (const name of Object.keys(plugin.fetch)) {
          Formio.registerPlugin(plugin.fetch[name], name);
        }
        break;
      case 'providers':
        for (const type of Object.keys(plugin.providers)) {
          Providers.addProviders(type, plugin.providers[type]);
        }
        break;
      case 'displays':
        Displays.addDisplays(plugin.displays);
        break;
      case 'builders':
        Builders.addBuilders(plugin.builders);
        break;
      case 'conjunctions':
        Conjunctions.addConjunctions(plugin.conjunctions);
        break;
      case 'operators':
        Operators.addOperators(plugin.operators);
        break;
      case 'quickRules':
        QuickRules.addQuickRules(plugin.quickRules);
        break;
      case 'rules':
        Rules.addRules(plugin.rules);
        break;
      case 'transformers':
        Transformers.addTransformers(plugin.transformers);
        break;
      case 'valueSources':
        ValueSources.addValueSources(plugin.valueSources);
        break;
      default:
        console.log('Unknown plugin option', key);
    }
  }
};

/**
 * Allows passing in plugins as multiple arguments or an array of plugins.
 *
 * Formio.plugins(plugin1, plugin2, etc);
 * Formio.plugins([plugin1, plugin2, etc]);
 */
export default function (...plugins) {
  plugins.forEach((plugin) => {
    if (Array.isArray(plugin)) {
      plugin.forEach(p => registerPlugin(p));
    }
    else {
      registerPlugin(plugin);
    }
  });
}