using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace MvcWebUI.Base
{
    public class BaseController : Controller
    {
        public enum MessageType
        {
            None = 0,
            Success = 1,
            Info = 2,
            Warning = 3,
            Error = 4
        }
        public void ShowInlineMessage(string message, MessageType messageType)
        {
            TempData["ShowInlineMessage"] = "<script>" +
                "ShowInlineMessage('" + message + "','" + messageType.ToString() + "')" +
                "</script>;";
            //ViewData["InlineMessage"] = message;
            //if (messageType == MessageType.Success)
            //    ViewData["ShowSuccess"] = "display:block;";
            //else
            //    ViewData["ShowSuccess"] = "display:none;";
            //if (messageType == MessageType.Info)
            //    ViewData["ShowInfo"] = "display:block;";
            //else
            //    ViewData["ShowInfo"] = "display:none;";
            //if (messageType == MessageType.Warning)
            //    ViewData["ShowWarning"] = "display:block;";
            //else
            //    ViewData["ShowWarning"] = "display:none;";
            //if (messageType == MessageType.Error)
            //    ViewData["ShowError"] = "display:block;";
            //else
            //    ViewData["ShowError"] = "display:none;";
        }

        public void ShowModalMessage(string message, MessageType messageType)
        {
            TempData["ShowModalMessage"] = "<script>" +
            "ShowModalMessage('" + message + "','" + messageType.ToString() + "')" +
            "</script>;";
        }
        public void ShowToastrMessage(string message, MessageType messageType)
        {
            TempData["ShowToastrMessage"] = "<script>" +
            "ShowToastrMessage('" + message + "','" + messageType.ToString() + "')" +
            "</script>;";
        }
        public void ShowTimerMessage(string message, MessageType messageType)
        {
            TempData["ShowTimerMessage"] = "<script>" +
            "ShowTimerMessage('" + message + "','" + messageType.ToString() + "')" +
            "</script>;";
        }
    }
}