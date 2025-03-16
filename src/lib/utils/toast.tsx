import { toast as sonnerToast } from 'sonner';
import { Toast } from '../../components/ui/toast';

export function toast(title: string) {
  return sonnerToast.custom((id: string | number) => (
    <Toast
      id={id}
      title={title}
    />
  ));
}