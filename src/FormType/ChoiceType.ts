///ts:ref=underscore.d.ts
/// <reference path="../../typings/generated/underscore/underscore.d.ts"/> ///ts:ref:generated
///ts:ref=handlebars.d.ts
/// <reference path="../../typings/generated/handlebars/handlebars.d.ts"/> ///ts:ref:generated
///ts:ref=node.d.ts
/// <reference path="../../typings/generated/node/node.d.ts"/> ///ts:ref:generated
import AbstractFormType = require('./AbstractFormType');
import FieldType = require('./FieldType');
import OptionType = require('./OptionType');
import ChoiceTypeOptionsInterface = require('../Options/ChoiceTypeOptionsInterface');
import _ = require('underscore');
import Handlebars = require('Handlebars');
import fs = require('fs');

class ChoiceType extends FieldType {
  protected children:OptionType[];
  protected options:ChoiceTypeOptionsInterface;

  public constructor(options?:ChoiceTypeOptionsInterface) {
    super(options);

    this.setChoices(this.options.choices);
  }

  public render():ChoiceType {
    super.render();

    if (_.isNull(this.options.data)) {
      this.getFormElement().selectedIndex = -1;
    }

    this.getFormElement().
      addEventListener('change', () => {
        this.emit('change');
      });

    return this;
  }

  public getFormElement():HTMLSelectElement {
    return <HTMLSelectElement>super.getFormElement();
  }

  protected addChildElement(childType:AbstractFormType) {
    this.getFormElement().appendChild(childType.el);
  }

  protected setDefaultOptions(options:ChoiceTypeOptionsInterface):ChoiceTypeOptionsInterface {
    _.defaults(options, {
      tagName: 'select',
      type: 'choice',
      choices: {},
      template: this.Handlebars.compile(
        fs.readFileSync(__dirname + '/../View/form/choice_widget.html.hbs', 'utf8')
      )
    });

    return super.setDefaultOptions(options);
  }

  public getData():string {
    var selectedChild = _.find(this.children, (child:OptionType) => child.isSelected());

    return selectedChild ? selectedChild.getData() : this.options.data;
  }

  public setData(data:string):void {
    var isSameData = data === this.getData();

    data = data ? data.toString() : data;

    this.children.forEach((child:OptionType) => {
      if (child.getData() === data) {
        child.select();
      }
      else {
        child.deselect();
      }
    });

    this.options.data = data;

    if (!isSameData) {
      this.emit('change');
    }
  }

  public setChoices(choices:_.Dictionary<string>):void {
    var currVal = this.getData();
    this.children.forEach((child:AbstractFormType) => this.removeChild(child));

    _.each(choices, (value:string, key:string) => {
      var optionType = new OptionType({
        data: key,
        label: value,
        selected: currVal === key
      });

      this.addChild(optionType);
    });
  }

  public disableOption(optionValue:string) {
    var option = this.getOption(optionValue);

    if (!option) {
      throw new Error('Unable to disable option ' + optionValue +
      ': the option does not exist');
    }

    option.disable();

    if (option.isSelected()) {
      option.deselect();
      this.getFormElement().selectedIndex = -1;
    }
  }

  public enableOption(optionValue:string) {
    var option = this.getOption(optionValue);

    if (!option) {
      throw new Error('Unable to enable option ' + optionValue +
      ': the option does not exist');
    }

    option.enable();
  }

  protected getOption(value:string):OptionType {
    var matchingOptions = this.children.
      filter((child:OptionType) => child.getData() === value);

    return matchingOptions.length ? matchingOptions[0] : null;
  }

}

export = ChoiceType;
