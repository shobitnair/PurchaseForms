import React, { useEffect, useState, useContext } from "react";
import {
  Grid,
  GridItem,
  Stack,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Fade,
  ScaleFade,
  Text
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormById } from "../Requests/formRequests";
import { LoginContext } from "../Login/LoginContext";
import { ScrollablePane } from "@fluentui/react";
import { Depths } from "@fluentui/react";
const StatusSP101 = () => {
  const { user, role } = useContext(LoginContext);
  const init = {
    hod: "success",
    jao: "success",
    ao: "success",
    ar: "success",
    hodHidden: true,
    jaoHidden: true,
    aoHidden: true,
    arHidden: true,
    hodTitle: "Approved by HOD",
    jaoTitle: "Approved by JAO",
    aoTitle: "Approved by AO",
    arTitle: "Approved by AR",
    hodMessage: "",
    jaoMessage: "",
    aoMessage: "",
    arMessage: "",
  };

  const [curStatus, setCurStatus] = useState(init);
  const [flag, setFlag] = useState(0);
  const param = useParams();

  useEffect(async () => {
    if (user && role) {
      if (flag === 0) {
        const response = await getFormById(param.id);
        if (response.hod === false) {
          if (response.status === "denied") {
            setCurStatus({
              ...curStatus,
              hodHidden: false,
              hod: "error",
              hodTitle: "Denied by HOD",
              hodMessage: 'Message for denial : ' + response.message
            });
          } else {
            setCurStatus({
              ...curStatus,
              hodHidden: false,
              hod: "info",
              hodTitle: "Waiting for HOD's approval",
            });
          }
        } else if (response.jao === false) {
          if (response.status === "denied") {
            setCurStatus({
              ...curStatus,
              hodHidden: false,
              jaoHidden: false,
              jao: "error",
              jaoTitle: "Denied by JAO",
              jaoMessage: 'Message for denial : ' + response.message
            });
          } else {
            setCurStatus({
              ...curStatus,
              hodHidden: false,
              jaoHidden: false,
              jao: "info",
              jaoTitle: "Waiting for JAO's approval",
            });
          }
        } else if (response.ao === false) {
          if (response.status === "denied") {
            setCurStatus({
              ...curStatus,
              hodHidden: false,
              jaoHidden: false,
              aoHidden: false,
              ao: "error",
              aoTitle: "Denied by AO",
              aoMessage: 'Message for denial : ' + response.message
            });
          } else {
            setCurStatus({
              ...curStatus,
              hodHidden: false,
              jaoHidden: false,
              aoHidden: false,
              ao: "info",
              aoTitle: "Waiting for AO's approval",
            });
          }
        } else if (response.ar === false) {
          if (response.status === "denied") {
            setCurStatus({
              ...curStatus,
              hodHidden: false,
              jaoHidden: false,
              aoHidden: false,
              arHidden: false,
              ar: "error",
              arTitle: "Denied by AR",
              arMessage: 'Message for denial : ' + response.message
            });
          } else {
            setCurStatus({
              ...curStatus,
              hodHidden: false,
              jaoHidden: false,
              aoHidden: false,
              arHidden: false,
              ar: "info",
              arTitle: "Waiting for AR's approval",
            });
          }
        } else {
          setCurStatus({
            ...curStatus,
            hodHidden: false,
            jaoHidden: false,
            aoHidden: false,
            arHidden: false,
          });
        }
        setFlag(1);
      } else {
        console.log(curStatus);
      }
    }
  }, [user, role, flag]);

  const Node = (props) => {
    const { status, hidden, title, description } = props;
    return (
      <ScaleFade initialScale={0.7} in={true}>
        <Box style={{ boxShadow: Depths.depth4, marginTop: '10px' }} >
          <Alert status={status} hidden={hidden} variant='top-accent'>
            <AlertIcon boxSize='30px' />
            <Stack>
              <AlertTitle fontSize={18}>{title}</AlertTitle>
              <AlertDescription ></AlertDescription>
              <Text fontSize={14} as='cite' width={'90%'}>
                {description}
              </Text>
            </Stack>
          </Alert>
        </Box>
      </ScaleFade>
    )
  }

  return (
    <div>
      {flag && <ScrollablePane style={{ marginLeft: '20%', 'height': '600px', 'width': '60%', marginTop: '80px', 'border': '8px solid #f3f2f1', padding: '10px', backgroundColor: '#f3f2f1', borderRadius: '2px', boxShadow: Depths.depth4 }}>
        <Stack spacing={3}>

          {(!curStatus.aoHidden) && (!curStatus.jaoHidden) && (!curStatus.arHidden) && (!curStatus.hodHidden) && (curStatus.ar === 'success') &&
            <Alert
              status='success'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              height='200px'
            >
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                Purchase Form approval complete!
              </AlertTitle>
              <AlertDescription maxWidth='sm' fontSize={16}>
                Thanks for submitting your application. Purchase Section will take care of your request.
              </AlertDescription>
            </Alert>}

          <Node status={curStatus.ar} hidden={curStatus.arHidden} title={curStatus.arTitle} description={curStatus.arMessage} />
          <Node status={curStatus.ao} hidden={curStatus.aoHidden} title={curStatus.aoTitle} description={curStatus.aoMessage} />

          <Node status={curStatus.jao} hidden={curStatus.jaoHidden} title={curStatus.jaoTitle} description={curStatus.jaoMessage} />

          <Node status={curStatus.hod} hidden={curStatus.hodHidden} title={curStatus.hodTitle} description={curStatus.hodMessage} />
          <Node status='success' hidden={false} title='Form is succesfully submitted' description='' />
        </Stack>
      </ScrollablePane>}

    </div>
  );
};

export default StatusSP101;
