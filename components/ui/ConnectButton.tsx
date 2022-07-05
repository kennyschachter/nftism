import { useAccount, useConnect } from "wagmi";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import useLogin from "@lib/hooks/useLogin";
import useUser from "@lib/hooks/useUser";
import useDevice from "@utils/useDeviceHook";
import { useEffect } from "react";

const ConnectorButtons: React.FC = ({ buttonClass }: any) => {
  const [{ data, error }, connect] = useConnect();
  const { login } = useLogin();
  const { isMobile } = useDevice();

  useEffect(() => {
    if (error) {
      console.log(error.name)
    }
  }, [error]);

  return (
    <Flex style={{ padding: "1em" }} direction="column">
      {data.connectors.map((connector) => {
        if (isMobile()) {
          return (
            <>
              <button
                disabled={!connector.ready}
                key={connector.id}
                className={buttonClass}
                onClick={async () => {
                  await connect(connector);
                  await login();
                }}
              >
                {connector.ready && connector.name}
              </button>
            </>
          );
        }
        return (
          <>
            <button
              disabled={!connector.ready}
              key={connector.id}
              className={buttonClass}
              onClick={async () => {
                await connect(connector);
                await login();
              }}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
            </button>
          </>
        );
      })}
      {/* // eslint-disable-next-line */}
      {error && typeof error === "object" && error.message !== undefined && error.name !== undefined && error.name !== "UserRejectedRequestError" && <div>{error.message}</div>}
      {/* {error && <div>{error?.message ?? "Failed to connect"}</div>} */}
    </Flex>
  );
};

export const ConnectButton: React.FC = ({ buttonClass }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data: connectData, error: connectError, loading: connectLoading }] =
    useConnect();
  const [
    { data: accountData, error: accountError, loading: accountLoading },
    disconnect,
  ] = useAccount();
  const { user } = useUser();
  const { login, logout } = useLogin();

  return (
    <>
      <button
        className={buttonClass}
        onClick={
          connectData.connected
            ? user?.isLoggedIn
              ? async () => {
                  await logout();
                  disconnect();
                  onClose();
                }
              : async () => {
                  await login();
                }
            : onOpen
        }
      >
        {connectData.connected
          ? user?.isLoggedIn
            ? "Logout"
            : "Sign in"
          : "CONNECT"}
      </button>
      <Modal
        onClose={onClose}
        isOpen={isOpen && !connectData.connected}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Your Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ConnectorButtons />
          </ModalBody>
          <ModalFooter>
            <Button
              variant={"ghost"}
              colorScheme={"blackAlpha"}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
