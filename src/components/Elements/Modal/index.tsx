interface ModalProps {
  name: string;
  onClickConfirm: (e: any) => void;
  onClickCancel: (e: any) => void;
  visible: boolean;
}

const Modal = (props: ModalProps) => {
  const { name, visible, onClickConfirm, onClickCancel } = props;

  {
    if (visible) {
      return (
        <div className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden transition flex items-center">
          <div
            aria-hidden="true"
            className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
          ></div>

          <div className="relative w-full cursor-pointer pointer-events-none transition my-auto p-4">
            <div className="w-full py-2 bg-white cursor-default pointer-events-auto dark:bg-gray-800 relative rounded-xl mx-auto max-w-sm">
              <div className="space-y-2 p-2">
                <div className="p-4 space-y-2 text-center dark:text-white">
                  <h2
                    className="text-xl font-bold tracking-tight"
                    id="page-action.heading"
                  >
                    Delete {name}
                  </h2>

                  <p className="text-gray-500">Are you sure?</p>
                </div>
              </div>

              <div className="space-y-2">
                <div
                  aria-hidden="true"
                  className="border-t dark:border-gray-700 px-2"
                ></div>

                <div className="px-6 py-2">
                  <div className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(0,1fr))]">
                    <button
                      type="button"
                      onClick={onClickCancel}
                      className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-gray-800 bg-white border-gray-300 hover:bg-gray-50 focus:ring-primary-600 focus:text-primary-600 focus:bg-primary-50 focus:border-primary-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:text-gray-200 dark:focus:text-primary-400 dark:focus:border-primary-400 dark:focus:bg-gray-800"
                    >
                      <span className="flex items-center gap-1">
                        <span className="">Cancel</span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={onClickConfirm}
                      className="inline-flex items-center justify-center py-1 gap-1 font-medium rounded-lg border transition-colors outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset dark:focus:ring-offset-0 min-h-[2.25rem] px-4 text-sm text-white shadow focus:ring-white border-transparent bg-red-600 hover:bg-red-500 focus:bg-red-700 focus:ring-offset-red-700"
                    >
                      <span className="flex items-center gap-1">
                        <span className="">Confirm</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
};

export default Modal;
