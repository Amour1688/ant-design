import * as React from 'react';
import Picker from 'rc-picker';
import { GenerateConfig } from 'rc-picker/lib/generate/index';
import { PickerBaseProps, PickerDateProps, PickerTimeProps } from 'rc-picker/lib/Picker';
import {
  CalendarOutlined,
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import { ConfigContext, ConfigConsumerProps } from '../config-provider';
import defaultLocale from './locale/en_US';

type InjectDefaultProps<Props> = Omit<
  Props,
  'locale' | 'generateConfig' | 'prevIcon' | 'nextIcon' | 'superPrevIcon' | 'superNextIcon'
> & {
  locale?: typeof defaultLocale;
};

function generatePicker<DateType>(generateConfig: GenerateConfig<DateType>) {
  type DatePickerProps =
    | InjectDefaultProps<PickerBaseProps<DateType>>
    | InjectDefaultProps<PickerDateProps<DateType>>
    | InjectDefaultProps<PickerTimeProps<DateType>>;

  class DatePicker extends React.Component<DatePickerProps> {
    static contextType = ConfigContext;

    context: ConfigConsumerProps;

    pickerRef = React.createRef<Picker<DateType>>();

    focus = () => {
      if (this.pickerRef.current) {
        this.pickerRef.current.focus();
      }
    };

    blur = () => {
      if (this.pickerRef.current) {
        this.pickerRef.current.blur();
      }
    };

    render() {
      const { getPrefixCls } = this.context;
      const { prefixCls: customizePrefixCls, locale, ...restProps } = this.props;
      const prefixCls = getPrefixCls('picker', customizePrefixCls);

      const mergedLocale = locale || defaultLocale;

      const additionalProps = {
        showToday: true,
      };

      return (
        <Picker<DateType>
          ref={this.pickerRef}
          locale={mergedLocale.lang}
          placeholder={mergedLocale.lang.placeholder}
          suffixIcon={<CalendarOutlined />}
          {...additionalProps}
          {...restProps}
          prefixCls={prefixCls}
          generateConfig={generateConfig}
          prevIcon={<LeftOutlined />}
          nextIcon={<RightOutlined />}
          superPrevIcon={<DoubleLeftOutlined />}
          superNextIcon={<DoubleRightOutlined />}
        />
      );
    }
  }

  return DatePicker;
}

export default generatePicker;
