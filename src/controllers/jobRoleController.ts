import { type Request, type Response } from "express";
import _ from "lodash";
import { validateRole } from "../helpers/validate";
import prisma from "../prisma";

class RoleController {
  static async createRole(req: Request, res: Response) {
    const { error } = validateRole(req.body);
    if (error !== undefined) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const job = await prisma.job.findUnique({
      where: {
        id: parseInt(req.body.jobId),
      },
    });

    if (job === null) {
      return res.status(404).json({
        error: "Job not found",
      });
    }

    const newrole = await prisma.role.create({
      data: {
        ..._.pick(req.body, ["content", "items"]),
        job: {
          connect: {
            id: parseInt(req.body.jobId),
          },
        },
      },
    });

    res.status(201).json({
      message: "Role created successfully",
      data: newrole,
    });
  }

  static async updateRole(req: Request, res: Response) {
    const { error } = validateRole(req.body);
    if (error !== undefined) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const jobId = req.body.jobId;

    const role = await prisma.role.findUnique({
      where: {
        jobId: parseInt(jobId),
      },
    });

    if (role === null) {
      return res.status(404).json({
        error: "Role not found",
      });
    }

    const updatedRole = await prisma.role.update({
      where: {
        jobId: parseInt(jobId),
      },
      data: {
        ..._.pick(req.body, ["content", "items"]),
      },
    });

    res.status(200).json({
      message: "Role updated successfully",
      data: updatedRole,
    });
  }
}

export default RoleController;
